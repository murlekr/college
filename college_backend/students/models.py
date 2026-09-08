from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Student(models.Model):
    """A single college student record."""

    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    department = models.CharField(max_length=100)
    # Only years 1-4 are valid college years.
    year = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.department}, Year {self.year})'
