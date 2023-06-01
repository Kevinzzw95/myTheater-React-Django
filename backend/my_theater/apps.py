from django.apps import AppConfig


class MyTheaterConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'my_theater'

    def ready(self):
        import my_theater.signals
