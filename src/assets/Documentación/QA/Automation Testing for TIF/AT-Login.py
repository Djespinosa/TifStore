import time
import pandas
from selenium import webdriver


driver = webdriver.Chrome('C:\webdriver_chrome\chromedriver.exe')
driver.get('http://localhost:3001/')
driver.maximize_window()
time.sleep(1)

btn_login_path = ('/html/body/div[1]/header/nav/div[3]/ul/li[3]/a')
user_name_path = ('//*[@id="log-user"]')
password_path = ('//*[@id="password"]')
btn_signin_path = ('/html/body/main/div/div[2]/section/form/div[3]/button')
btn_logout_path = ('/html/body/div[1]/header/nav/div[3]/ul/li[4]/a')

btn_login = driver.find_element('xpath',btn_login_path)
btn_login.click()
time.sleep(1)

login_data = r'C:\Users\royber\Desktop\Automation Testing for TIF/login_data.xlsx'
datos = pandas.read_excel(login_data)

#TC LOG001
user = str(datos["user"][0])
password = str(datos["password"][0])

user_name = driver.find_element('xpath',user_name_path)
user_name.send_keys(user)
pw = driver.find_element('xpath', password_path)
pw.send_keys(password)

btn_signin = driver.find_element('xpath',btn_signin_path)
btn_signin.click()

time.sleep(2)

btn_logout = driver.find_element('xpath',btn_logout_path)

if btn_logout.text == "Cerrar sesión" :
    print("CASO DE PRUEBA LOG001, CORREO Y CONTRASEÑA CORRECTOS: EXITOSO")
else :
    print("CASO DE PRUEBA LOG001, CORREO Y CONTRASEÑA CORRECTOS: FRACASÓ")

btn_logout.click()
time.sleep(1)

#TC LOG002
btn_login = driver.find_element('xpath',btn_login_path)
btn_login.click()

btn_signin = driver.find_element('xpath',btn_signin_path)
btn_signin.click()

warning_msg = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[2]')

if warning_msg.text == "El usuario no está registrado" :
    print("CASO DE PRUEBA LOG002, CAMPOS USUARIO Y CONTRASEÑA VACÍOS: EXITOSO")
else :
    print("CASO DE PRUEBA LOG002, CAMPOS USUARIO Y CONTRASEÑA VACÍOS: FRACASÓ")

time.sleep(1)

#TC LOG003

user2 = str(datos["user"][2])
password2 = str(datos["password"][2])
user_name = driver.find_element('xpath', user_name_path)
user_name.send_keys(user2)

pw = driver.find_element('xpath', password_path)
pw.send_keys(password2)

btn_signin = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[4]/button')
btn_signin.click()

warning_msg = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[2]')

if warning_msg.text == "El usuario no está registrado" :
    print("CASO DE PRUEBA LOG003, LOGIN DE CUENTA SIN REGISTRAR: EXITOSO")
else :
    print("CASO DE PRUEBA LOG003, LOGIN DE CUENTA SIN REGISTRAR: FRACASÓ")
time.sleep(1)

#TC LOG004

user3 = str(datos["user"][3])
password3 = str(datos["password"][3])
user_name = driver.find_element('xpath', user_name_path)
user_name.send_keys(user3)

pw = driver.find_element('xpath', password_path)
pw.send_keys(password3)

btn_signin = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[4]/button')
btn_signin.click()

warning_msg = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[3]')

if warning_msg.text == "La contraseña es incorrecta" :
    print("CASO DE PRUEBA LOG004, USUARIO CORRECTO CON CONTRASEÑA INCORRECTA: EXITOSO")
else :
    print("CASO DE PRUEBA LOG004, USUARIO CORRECTO CON CONTRASEÑA INCORRECTA: FRACASÓ")

time.sleep(1)

#TC LOG005-1

user4 = str(datos["user"][4])
user_name = driver.find_element('xpath', user_name_path)
user_name.send_keys(user4)


btn_signin = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[4]/button')
btn_signin.click()

warning_msg = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[3]')

if warning_msg.text == "La contraseña es incorrecta" :
    print("CASO DE PRUEBA LOG005-1, USUARIO CORRECTO Y CONTRASEÑA VACÍA: EXITOSO")
else :
    print("CASO DE PRUEBA LOG005-1, USUARIO CORRECTO Y CONTRASEÑA VACÍA: FRACASÓ")

time.sleep(1)

#TC LOG005-2

password5 = str(datos["password"][5])

pw = driver.find_element('xpath', password_path)
pw.send_keys(password5)

btn_signin = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[4]/button')
btn_signin.click()

warning_msg = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[2]')

if warning_msg.text == "El usuario no está registrado" :
    print("CASO DE PRUEBA LOG005-2, USUARIO VACÍO Y CONTRASEÑA CORRECTA: EXITOSO")
else :
    print("CASO DE PRUEBA LOG005-2, USUARIO VACÍO Y CONTRASEÑA CORRECTA: FRACASÓ")

time.sleep(1)