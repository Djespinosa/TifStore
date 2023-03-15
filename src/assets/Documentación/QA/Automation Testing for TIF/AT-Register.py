import time
import pandas
from selenium import webdriver
from selenium.webdriver.support.select import Select

driver = webdriver.Chrome('C:\webdriver_chrome\chromedriver.exe')
driver.get('http://localhost:3001/')
driver.maximize_window()
time.sleep(1)

reg_path = '/html/body/div[1]/header/nav/div[3]/ul/li[4]/a'

btn_register = driver.find_element('xpath', reg_path)
btn_register.click()

dng_name_path = '/html/body/main/div/div[2]/section/form/div[2]'
dng_user_path = '/html/body/main/div/div[2]/section/form/div[4]'
dng_doctype_path = '/html/body/main/div/div[2]/section/form/div[6]'
dng_numdoc_path = '/html/body/main/div/div[2]/section/form/div[8]'
dng_address_path = '/html/body/main/div/div[2]/section/form/div[10]'
dng_phone_path = '/html/body/main/div/div[2]/section/form/div[12]'
dng_email_path = '/html/body/main/div/div[2]/section/form/div[14]'
dng_password_path = '/html/body/main/div/div[2]/section/form/div[16]'

name_path = '//*[@id="name"]'
user_path = '//*[@id="user_name"]' 
doctype_path = '//*[@id="identification_type"]' 
numdoc_path = '//*[@id="identification"]'
address_path = '//*[@id="address"]'
phone_path = '//*[@id="phone"]'
email_path = '//*[@id="email"]'
password_path = '//*[@id="password"]'

#TC REG001
btn_signup_path = '/html/body/main/div/div[2]/section/form/div[10]/button' 
btn_signup = driver.find_element('xpath', btn_signup_path)
btn_signup.click()

dng_name = driver.find_element('xpath', dng_name_path)
dng_user = driver.find_element('xpath', dng_user_path)
dng_doctype = driver.find_element('xpath', dng_doctype_path)
dng_numdoc = driver.find_element('xpath', dng_numdoc_path)
dng_address = driver.find_element('xpath', dng_address_path)
dng_phone = driver.find_element('xpath',dng_phone_path)
dng_email = driver.find_element('xpath',dng_email_path)
dng_password = driver.find_element('xpath', dng_password_path)

if dng_name.text == 'El nombre es obligatorio' and dng_user.text == 'El usuario es obligatorio' and dng_doctype.text == 'El tipo de identificación es obligatorio' and dng_numdoc.text == 'La identificación es obligatoria' and dng_address.text == 'La dirección es obligatoria' and dng_phone.text == 'El celular es obligatorio' and dng_email.text == 'El email es obligatorio' and dng_password.text == 'La contraseña es obligatoria' :
    print("CASO DE PRUEBA REG001, REGISTRO CON CAMPOS VACÍOS: EXITOSO")
else :
    print("CASO DE PRUEBA REG001, REGISTRO CON CAMPOS VACÍOS: FRACASÓ")

time.sleep(1)


register_data = r'C:\Users\royber\Desktop\Automation Testing for TIF/register_data.xlsx'
datos = pandas.read_excel(register_data)

#TC REG002

name = str(datos["name"][0])
user = str(datos["user"][0])
doctype = str(datos["document"][0])
numdoc = str(datos["docnumber"][0])
address = str(datos["address"][0])
phone = str(datos["phone"][0])
email = str(datos["email"][0])
password = str(datos["password"][0])

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[18]/button')
btn_signup.click()

time.sleep(1)

log_user = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[1]/input')
log_user.send_keys(user)

log_password = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[2]/input')
log_password.send_keys(password)

btn_login = driver.find_element('xpath', '/html/body/main/div/div[2]/section/form/div[3]/button')
btn_login.click()

cd = driver.find_element('xpath', '/html/body/div[1]/header/nav/div[3]/ul/li[4]/a')

if cd.text == "Cerrar sesión" :
    print("CASO DE PRUEBA REG002, REGISTRO DE USUARIO CORRECTAMENTE: EXITOSO")
else :
    print("CASO DE PRUEBA REG002, REGISTRO DE USUARIO CORRECTAMENTE: FRACASÓ")

cd.click()
time.sleep(1)

#TC REG003

btn_register = driver.find_element('xpath', reg_path)
btn_register.click()

name = str(datos["name"][1])
user = str(datos["user"][1])
doctype = str(datos["document"][1])
numdoc = str(datos["docnumber"][1])
address = str(datos["address"][1])
phone = str(datos["phone"][1])
email = str(datos["email"][1])
password = str(datos["password"][1])

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[8]')

if warning.text == "El email ya esta registrado" :
    print("CASO DE PRUEBA REG003, REGISTRO CON EMAIL YA REGISTRADO: EXITOSO")
else :
    print("CASO DE PRUEBA REG003, REGISTRO CON EMAIL YA REGISTRADO: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()



#TC REG004

name = str(datos["name"][2])
user = str(datos["user"][2])
doctype = str(datos["document"][2])
numdoc = str(datos["docnumber"][2])
address = str(datos["address"][2])
phone = str(datos["phone"][2])
email = str(datos["email"][2])
password = str(datos["password"][2])

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[8]')

if warning.text == "Debes escribir el email en un formato válido" :
    print("CASO DE PRUEBA REG004, REGISTRO CON EMAIL INEXISTENTE: EXITOSO")
else :
    print("CASO DE PRUEBA REG004, REGISTRO CON EMAIL INEXISTENTE: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()


#TC REG005-1

name = str(datos["name"][3])
user = str(datos["user"][3])
doctype = str(datos["document"][3])
numdoc = str(datos["docnumber"][3])
address = str(datos["address"][3])
phone = str(datos["phone"][3])
email = str(datos["email"][3])
password = str(datos["password"][3])

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[2]')

if warning.text == "El nombre es obligatorio" :
    print("CASO DE PRUEBA REG005-1, REGISTRO PARCIAL SIN NOMBRES: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-1, REGISTRO PARCIAL SIN NOMBRES: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()


#TC REG005-2


in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[3]')

if warning.text == "El usuario es obligatorio" :
    print("CASO DE PRUEBA REG005-2, REGISTRO PARCIAL SIN USUARIO: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-2, REGISTRO PARCIAL SIN USUARIO: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()


#TC REG005-3


in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[4]')

if warning.text == "El tipo de identificación es obligatorio" :
    print("CASO DE PRUEBA REG005-3, REGISTRO PARCIAL SIN SELECCIÓN DE DOCUMENTO: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-3, REGISTRO PARCIAL SIN SELECCIÓN DE DOCUMENTO: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()



#TC REG005-4


in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[5]')

if warning.text == "La identificación es obligatoria" :
    print("CASO DE PRUEBA REG005-4, REGISTRO PARCIAL SIN NÚMERO DE DOCUMENTO: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-4, REGISTRO PARCIAL SIN NÚMERO DE DOCUMENTO: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()


#TC REG005-5


in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[6]')

if warning.text == "La dirección es obligatoria" :
    print("CASO DE PRUEBA REG005-5, REGISTRO PARCIAL SIN DIRECCIÓN: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-5, REGISTRO PARCIAL SIN DIRECCIÓN: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()


#TC REG005-6

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[7]')

if warning.text == "El celular es obligatorio" :
    print("CASO DE PRUEBA REG005-6, REGISTRO PARCIAL SIN CELULAR: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-6, REGISTRO PARCIAL SIN CELULAR: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()


#TC REG005-7

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys(password)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[8]')

if warning.text == "El email es obligatorio" :
    print("CASO DE PRUEBA REG005-7, REGISTRO PARCIAL SIN EMAIL: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-7, REGISTRO PARCIAL SIN EMAIL: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()

#TC REG005-8

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[9]')

if warning.text == "La contraseña es obligatoria" :
    print("CASO DE PRUEBA REG005-8, REGISTRO PARCIAL SIN CONTRASEÑA: EXITOSO")
else :
    print("CASO DE PRUEBA REG005-8, REGISTRO PARCIAL SIN CONTRASEÑA: FRACASÓ")

time.sleep(1)

btn_register = driver.find_element('xpath', '/html/body/main/div/div[1]/div[2]/a/button')
btn_register.click()

#TC REG006

in_name = driver.find_element('xpath', name_path)
in_name.send_keys(name)

in_user = driver.find_element('xpath', user_path)
in_user.send_keys(user)

in_doctype = driver.find_element('xpath', doctype_path)
dropdown_doctype = Select(in_doctype)
dropdown_doctype.select_by_value(doctype)

in_numdoc = driver.find_element('xpath', numdoc_path)
in_numdoc.send_keys(numdoc)

in_address = driver.find_element('xpath', address_path)
in_address.send_keys(address)

in_phone = driver.find_element('xpath', phone_path)
in_phone.send_keys(phone)

in_email = driver.find_element('xpath', email_path)
in_email.send_keys(email)

in_password = driver.find_element('xpath', password_path)
in_password.send_keys("testeo123")

btn_signup = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[10]/button')
btn_signup.click()

time.sleep(1)

warning = driver.find_element('xpath','/html/body/main/div/div[2]/section/form/div[9]')

if warning.text == "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial" :
    print("CASO DE PRUEBA REG006, REGISTRO CON CONTRASEÑA NO VÁLIDA: EXITOSO")
else :
    print("CASO DE PRUEBA REG006, REGISTRO CON CONTRASEÑA NO VÁLIDA: FRACASÓ")

time.sleep(1)

print("Casos de prueba del proceso registro completados")