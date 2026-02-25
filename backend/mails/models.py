from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Mail(models.Model):
    date = models.DateField('Дата поступления письма')
    full_name = models.CharField('Фамилия, имя, отчество отправителя', max_length=50)
    sender = models.CharField('Название предприятия или объекта, откуда поступило обращение', max_length=50)
    tel_number = PhoneNumberField('Контактный номер телефона')
    email = models.EmailField('Адрес электронной почты отправителя')
    factory_nums = models.CharField('Номера приборов (газонализаторов), указанные в письме')
    device_type = models.CharField('Модель или тип устройства')
    emotional_color = models.CharField('Анализ тональности (позитив/нейтраль/негатив)')
    question = models.TextField('Краткое описание проблемы или запроса')
