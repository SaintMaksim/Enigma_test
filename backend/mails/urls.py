from django.urls import path

from mails import views

urlpatterns = [
    path('list/', views.MailListView.as_view(), name='list'),
    path('create/', views.MailCreateView.as_view(), name='create'),
]
