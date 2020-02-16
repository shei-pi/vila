from django.db import models
from django.contrib.auth.models import User, Group


class Device(User):

    device_id = models.CharField(unique=True, max_length=100)

# Create your models here.
class DeviceData(models.Model):
    
    device_id           = models.ForeignKey(Device, on_delete=models.CASCADE)
    timestamp           = models.DateTimeField(auto_now_add=True)
    temperature         = models.FloatField(blank=True,null=True)
    humidity            = models.FloatField(blank=True,null=True)
    compressor_status   = models.CharField(max_length=10,blank=True, default='')
    fan_status          = models.CharField(max_length=10,blank=True, default='')
    line_current        = models.FloatField(blank=True,null=True)
    line_voltage        = models.FloatField(blank=True,null=True)

    class Meta:
        ordering = ['timestamp']

        