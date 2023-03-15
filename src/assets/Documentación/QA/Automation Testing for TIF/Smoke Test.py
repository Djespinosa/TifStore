import time
import pandas
from selenium import webdriver
from selenium.webdriver.common.by import By


driver = webdriver.Chrome('C:\webdriver_chrome\chromedriver.exe')
driver.get('http://localhost:3001/')
driver.maximize_window()
time.sleep(1)

btn_login_path = ('/html/body/div[1]/header/nav/div[3]/ul/li[3]/a')
user_name_path = ('//*[@id="log-user"]')
password_path = ('//*[@id="password"]')
btn_signin_path = ('/html/body/main/div/div[2]/section/form/div[3]/button')
btn_logout_path = ('/html/body/div[1]/header/nav/div[3]/ul/li[4]/a')
products_path = ('/html/body/div[1]/section[3]/div')

btn_login = driver.find_element('xpath',btn_login_path)
btn_login.click()
time.sleep(1)

login_data = r'C:\Users\royber\Desktop\Automation Testing for TIF/login_data.xlsx'
datos = pandas.read_excel(login_data)

#Inicio de sesión
user = str(datos["user"][0])
password = str(datos["password"][0])

user_name = driver.find_element('xpath',user_name_path)
user_name.send_keys(user)
pw = driver.find_element('xpath', password_path)
pw.send_keys(password)

btn_signin = driver.find_element('xpath',btn_signin_path)
btn_signin.click()

time.sleep(1)

btn_logout = driver.find_element('xpath',btn_logout_path)

if btn_logout.text == "Cerrar sesión" :
    print("INICIO DE SESIÓN: EXITOSO")
else :
    print("INICIO DE SESIÓN: FRACASÓ")

products_view = driver.find_element('xpath', products_path)
products_view.location_once_scrolled_into_view
time.sleep(1)

categories = driver.find_elements(By.CLASS_NAME, 'card')

for i in categories:
    i.click()
    category = driver.find_element(By.CLASS_NAME, "underlined")
    print("Categoría: "+ category.text) 
    products = driver.find_elements(By.CLASS_NAME, 'card')
    time.sleep(1)
    for e in products:
        e.click()
        product = driver.find_element('xpath','/html/body/main/div/section/div/h2')
        print("Producto: " + product.text)
        time.sleep(1)
        driver.back()
    driver.back()

