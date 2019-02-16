from rest_framework import serializers
from dashboard.models import Sensors, SensorValues, Switch


class SensorValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorValues
        fields = ('id', 'value', 'sensor')


class SensorSerializer(serializers.ModelSerializer):
    last_value = serializers.SerializerMethodField()

    class Meta:
        model = Sensors
        fields = ('id', 'name', 'type', 'last_value')

    def get_last_value(self, obj):
        if obj.values.exists():
            return obj.values.latest('pk').value
        else:
            return 'None'


class SwitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Switch
        fields = ('id', 'name', 'on', 'type', 'gpio_pin')
