from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Student


class AuthenticationTests(APITestCase):
    def test_register_user(self):
        url = reverse('auth-register')
        payload = {
            'username': 'student1',
            'email': 'student1@gmail.com',
            'password': 'password123',
            'password2': 'password123',
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['username'], 'student1')
        self.assertTrue(User.objects.filter(username='student1').exists())

    def test_register_password_mismatch(self):
        url = reverse('auth-register')
        payload = {
            'username': 'student2',
            'email': 'student2@gmail.com',
            'password': 'password123',
            'password2': 'different123',
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_returns_tokens(self):
        User.objects.create_user(username='student1', email='s1@gmail.com', password='password123')
        url = reverse('auth-login')
        response = self.client.post(url, {'username': 'student1', 'password': 'password123'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['username'], 'student1')

    def test_me_requires_authentication(self):
        url = reverse('auth-me')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_returns_current_user(self):
        user = User.objects.create_user(username='student1', email='s1@gmail.com', password='password123')
        self.client.force_authenticate(user=user)
        url = reverse('auth-me')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'student1')


class StudentAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='student1', email='s1@gmail.com', password='password123')
        self.student = Student.objects.create(
            name='John', email='john@gmail.com', phone='9876543210',
            department='Computer Science', year=3,
        )

    def test_list_requires_authentication(self):
        url = reverse('student-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_student(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('student-list')
        payload = {
            'name': 'Jane', 'email': 'jane@gmail.com', 'phone': '9876543211',
            'department': 'Mathematics', 'year': 2,
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Jane')

    def test_list_students(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('student-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_student(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('student-detail', args=[self.student.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'john@gmail.com')

    def test_retrieve_student_not_found(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('student-detail', args=[9999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_student(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('student-detail', args=[self.student.id])
        response = self.client.patch(url, {'year': 4}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['year'], 4)

    def test_delete_student(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('student-detail', args=[self.student.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Student.objects.filter(id=self.student.id).exists())
