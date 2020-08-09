from django.urls import include, path
from rest_framework import routers
from ambiente import views
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'devices', views.DeviceViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('device_list/', views.DeviceList.as_view()),
    path('device_data/', views.DeviceDataView.as_view()),
    path('device_list/<int:pk>', views.DeviceDetail.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# urlpatterns = format_suffix_patterns(urlpatterns)