from dashboard.models import Sensors, SensorValues, Switch
from dashboard.serializers import SensorSerializer, SensorValuesSerializer, SwitchSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from os import getenv
import requests

import paho.mqtt.publish as publish

KEY = getenv("DARK_SKY_SECRET")
URL = "https://api.darksky.net/forecast/" + KEY + "/44.4268,26.1025?exclude=minutely,hourly,alerts&lang=ro&units=si"


class SensorList(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Sensors.objects.all()
    serializer_class = SensorSerializer


class SensorDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Sensors.objects.all()
    serializer_class = SensorSerializer


class SensorValuesAdd(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SensorValues.objects.all()
    serializer_class = SensorValuesSerializer


class SensorValueList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SensorValues.objects.all()
    serializer_class = SensorValuesSerializer

    def get_queryset(self):
        # return only the values for the relevant sensor
        sensor = self.kwargs['pk']
        return SensorValues.objects.filter(sensor=sensor)


class SensorValueDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'value'
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SensorValues.objects.all()
    serializer_class = SensorValuesSerializer


class SwitchList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SwitchSerializer

    def get_queryset(self):
        _type = self.kwargs.get('type')
        if _type:
            return Switch.objects.filter(type=_type.capitalize())
        return Switch.objects.all()


class SwitchDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Switch.objects.all()
    serializer_class = SwitchSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.gpio_pin == 2:  # Panic button, switch everything off
            Switch.objects.all().update(on=False)
        publish.single('pi/relay', instance.gpio_pin, hostname='localhost')
        serializer.save()


class Weather(APIView):
    """
    View to return weather data
    * Requires token authentication

    Uses the darksky API to fetch data for the next week
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):

        req = requests.get(URL)
        req_response = req.json()

        # parsing the response for the wanted values
        response = {
            "currently": {
                "currentTemperature": req_response["currently"]["temperature"],
                "temperatureHigh": req_response["daily"]["data"][0]["temperatureHigh"],  # the daily data, 0 being today
                "temperatureLow": req_response["daily"]["data"][0]["temperatureLow"],
                "precipProbability": req_response["currently"]["precipProbability"],
                "icon": req_response["currently"]["icon"],
            },
            "tomorrow": {
                "temperatureHigh": req_response["daily"]["data"][1]["temperatureHigh"],  # the daily data, 1 being tomorrow
                "temperatureLow": req_response["daily"]["data"][1]["temperatureLow"],
                "precipProbability": req_response["daily"]["data"][1]["precipProbability"],
                "icon": req_response["daily"]["data"][1]["icon"],
            }
        }

        return Response(response)
