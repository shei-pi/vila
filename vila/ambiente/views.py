from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from ambiente.serializers import UserSerializer, GroupSerializer, DeviceDataSerializer,DeviceSerializer
from ambiente.models import Device, DeviceData
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from rest_framework import mixins
from rest_framework import generics
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
class DeviceDataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = DeviceData.objects.all()
    serializer_class = DeviceDataSerializer

class DeviceList(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    
class DeviceDataView(generics.ListCreateAPIView):
    serializer_class = DeviceDataSerializer
    def get_queryset(self):
        """
        Optionally restricts the returned device to a determined period
        """
        queryset = DeviceData.objects.all()
        from_dt = self.request.query_params.get('from_dt', None)
        to_dt = self.request.query_params.get('to_dt', None)
        device_id = self.request.query_params.get('device_id', None)
        if device_id is not None:
            queryset = queryset.filter(device_id=device_id)
        if from_dt is not None:
            queryset = queryset.filter(timestamp__gte=from_dt)
        if to_dt is not None:
            queryset = queryset.filter(timestamp__lte=to_dt)
        return queryset

    def post(self, request, *args, **kwargs):
        device_inst,create=Device.objects.get_or_create(device_id = request.data.get('device_id','0'))
        
        return self.create(request, device_id=device_inst.pk, *args, **kwargs)