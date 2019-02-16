from django.urls import path
from dashboard import views

urlpatterns = [
    path('sensors/', views.SensorList.as_view()),
    path('sensors/add_value', views.SensorValuesAdd.as_view()),
    path('sensors/<int:pk>/', views.SensorDetail.as_view()),
    path('sensors/<int:pk>/values/', views.SensorValueList.as_view()),
    path('sensors/<int:pk>/values/<int:value>', views.SensorValueDetail.as_view()),

    path('switches/', views.SwitchList.as_view()),
    path('switches/<int:pk>', views.SwitchDetail.as_view()),
    path('switches/<str:type>', views.SwitchList.as_view()),

    path('weather/', views.Weather.as_view())
]
