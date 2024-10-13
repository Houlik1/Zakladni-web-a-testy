import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture()
def nacteni_webu():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://127.0.0.1:5500/index.html")
        yield page
        page.close()
        browser.close()

def test_nadpis(nacteni_webu):
    page = nacteni_webu
    nadpis = page.locator("h1")
    assert nadpis.inner_text() == "Nadpis"

def test_normalni_text(nacteni_webu):
    page = nacteni_webu
    text = page.locator(".prvni_text")
    assert text.inner_text()=="A copak tohle?"

def test_input_a_button(nacteni_webu):
    page = nacteni_webu
    input = page.locator("#input")
    input.fill("Hello")
    assert input.input_value()== "Hello"
    button = page.locator(".odeslat")
    assert button.inner_text() == "Odeslat"

def test_selects(nacteni_webu):
    page = nacteni_webu
    select1 = page.locator("#prvni_select")
    select1.select_option("volba2")
    selected_value = select1.input_value()
    assert selected_value == "volba2"

def test_checbox(nacteni_webu):
    page = nacteni_webu
    check = page.locator("#prvni")
    check.check()
    assert check.is_checked() == True

def test_radio(nacteni_webu):
    page = nacteni_webu
    radio1 = page.locator("#radio1")
    radio2 = page.locator("#radio2")
    radio3 = page.locator("#radio3")
    radio1.check()
    assert radio1.is_checked()==True
    assert radio2.is_checked()==False
    assert radio3.is_checked()==False
    radio2.check()
    assert radio1.is_checked()==False
    assert radio2.is_checked()==True
    assert radio3.is_checked()==False

def test_odkaz(nacteni_webu):
    page = nacteni_webu
    odkaz = page.locator("#odkaz")
    odkaz.click()
    page.wait_for_url("https://example.cypress.io/")
    url = page.url
    assert url == "https://example.cypress.io/"

