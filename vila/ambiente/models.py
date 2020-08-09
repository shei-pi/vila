from django.db import models
from django.contrib.auth.models import User


class Device(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    device_id   = models.CharField(unique=True, max_length=100)

# Create your models here.
class DeviceData(models.Model):
    
    device              = models.ForeignKey(Device, on_delete=models.CASCADE)
    timestamp           = models.DateTimeField(auto_now_add=True)
    temperature         = models.FloatField(blank=True,null=True)
    humidity            = models.FloatField(blank=True,null=True)
    compressor_status   = models.CharField(max_length=10,blank=True, default='')
    fan_status          = models.CharField(max_length=10,blank=True, default='')
    line_current        = models.FloatField(blank=True,null=True)
    line_voltage        = models.FloatField(blank=True,null=True)

    class Meta:
        ordering = ['timestamp']

