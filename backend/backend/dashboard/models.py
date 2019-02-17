from django.db import models


class Sensors(models.Model):
    name = models.CharField(max_length=20, unique=True)
    type = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class SensorValues(models.Model):
    value = models.DecimalField(max_digits=5, decimal_places=2)
    sensor = models.ForeignKey(Sensors, related_name='values', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-id']


class Switch(models.Model):
    '''
    gpio_pin: the gpio pin of the raspberry pi that corresponds with the switch. Used to send MQTT message
    '''
    name = models.CharField(max_length=20)
    on = models.BooleanField()
    gpio_pin = models.PositiveIntegerField(unique=True)

    LIGHT = 'Light'
    SOCKET = 'Socket'
    BUTTON = 'Button'
    TYPE_CHOICES = (
        (LIGHT, LIGHT),
        (SOCKET, SOCKET),
        (BUTTON, BUTTON)
    )

    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        blank=False
    )
