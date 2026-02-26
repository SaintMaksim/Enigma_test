from django.db import models


class Mail(models.Model):
    date = models.DateField('Дата поступления письма')
    full_name = models.CharField('Фамилия, имя, отчество отправителя', max_length=50)
    sender = models.CharField('Название предприятия или объекта, откуда поступило обращение', max_length=50)
    tel_number = models.CharField('Контактный номер телефона')
    email = models.EmailField('Адрес электронной почты отправителя')
    factory_nums = models.CharField('Номера приборов (газонализаторов), указанные в письме', max_length=50)
    device_type = models.CharField('Модель или тип устройства', max_length=50)
    emotional_color = models.CharField('Анализ тональности (позитив/нейтраль/негатив)', max_length=50)
    question = models.TextField('Краткое описание проблемы или запроса')

    class Meta:
        verbose_name = 'письмо'
        verbose_name_plural = 'Письма'

    def __str__(self):
        return f'{self.date} - {self.full_name}'
