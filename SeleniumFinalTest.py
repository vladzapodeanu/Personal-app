from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

s = Service("C:\\Users\\vlad.zapodeanu\\Downloads\\chromedriver_win32\\chromedriver.exe")
driver = webdriver.Chrome(service=s)
driver.implicitly_wait(30)

cookie_accept_id = "cookiescript_accept"
sign_up_id = "qa_header-signup"
first_name_id = "first-name"
last_name_id = "last-name"
email_id = "email"
password_id = "sign-up-password-input"
confirm_password_id = "sign-up-confirm-password-input"
about_us_dropdown_id = "sign-up-heard-input"
about_us_option_text = "Web-Search"
submit_button_id = " qa_loader-button"
participant_button_id = "qa_signup-participant"
organizer_button_id = "qa_signup-organizer"

account_menu_id = "qa_header-profile-button"
logout_menu_id = "qa_header-submenu-logout"


def click_sign_up_button():
    sign_up_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', sign_up_id)))
    sign_up_button.click()


def insert_first_name(first_name_input):
    first_name = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', first_name_id)))
    first_name.send_keys(first_name_input)


def insert_last_name(last_name_input):
    last_name = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', last_name_id)))
    last_name.send_keys(last_name_input)


def insert_email(email_input):
    email = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', email_id)))
    email.send_keys(email_input)


def insert_password(password_input):
    password = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', password_id)))
    password.send_keys(password_input)


def insert_confirm_password(password_input):
    confirm_password = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', confirm_password_id)))
    confirm_password.send_keys(password_input)


def select_about_us():
    about_us_dropdown = Select(driver.find_element(By.ID, about_us_dropdown_id))
    about_us_dropdown.select_by_visible_text(about_us_option_text)


def submit():
    submit_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', submit_button_id)))
    submit_button.click()


def as_participant():
    participant_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', participant_button_id)))
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    participant_button.click()


def as_organizer():
    organizer_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', organizer_button_id)))
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    organizer_button.click()


def accept_cookies():
    cookie_accept = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', cookie_accept_id)))
    cookie_accept.click()


def select_menu():
    account_menu = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', account_menu_id)))
    account_menu.click()


def logout():
    logout_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located(('id', logout_menu_id)))
    logout_button.click()


# inputData sample
firstName = "vlad"
lastName = "zapodeanu"
email = "vlad.zapodeanu@yahoo.com"
password = "passW21."

# Setup
driver.maximize_window()
driver.get("https://politrip.com")
driver.implicitly_wait(5)

# Accept cookies
accept_cookies()

# input data + validation
click_sign_up_button()
insert_first_name(firstName)
insert_last_name(lastName)
insert_email(email)
insert_password(password)
insert_confirm_password(password)
select_about_us()
submit()
as_organizer()
select_menu()
logout()

print("pass")
# assert
pass_condition = driver.current_url == 'https://politrip.com/'
assert pass_condition == True
