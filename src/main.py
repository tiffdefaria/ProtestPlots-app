import time
import sys
import json
import string
import re

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from bs4 import BeautifulSoup as bs
import pandas as pd

def scrape_gnv():
    # open the site and block pop-ups
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('disable-notifications')
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(options=chrome_options)
    url = 'https://facebook.com'

    driver.get(url)

    # log in to the site
    # on facebook, username = 'email', password = 'pass'
    username = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='email']")))
    password = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='pass']")))

    # login button is type 'submit'
    # enter username and password
    with open('credentials.json') as credentialFile:
        data = json.load(credentialFile)

    username.clear()
    username.send_keys(data['username'])
    password.clear()
    password.send_keys(data['password'])
    time.sleep(2)

    # click the log in button
    button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

    # once we are logged in, now go to our target events site to scrape:
    url2 = 'https://www.facebook.com/indivisiblegainesville/events/?ref=page_internal/'
    time.sleep(2)
    driver.get(url2)

    # now grab events data
    # first i need to click see more at the bottom of the page a few times.
    time.sleep(2)
    # scroll down
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)


    # need to click the "see more" button at the bottom
    for i in range(10):
        seeMore = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "[aria-label='See more']"))).click()
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)
    
    # Get a dump of the HTML.
    pageSource = driver.execute_script("return document.body.innerHTML;")
    with open('page_source.txt', 'w', encoding="utf-8") as htmlDump:
        soupData = bs(pageSource, 'html.parser')
        htmlDump.write(str(soupData.prettify()))

    driver.close()

def scrape_ny():
    # open the site and block pop-ups
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('disable-notifications')
    chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(options=chrome_options)
    url = 'https://facebook.com'

    driver.get(url)

    # log in to the site
    # on facebook, username = 'email', password = 'pass'
    username = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='email']")))
    password = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='pass']")))

    # login button is type 'submit'
    # enter username and password
    with open('credentials.json') as credentialFile:
        data = json.load(credentialFile)

    username.clear()
    username.send_keys(data['username'])
    password.clear()
    password.send_keys(data['password'])
    time.sleep(2)

    # click the log in button
    button = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

    # once we are logged in, now go to our target events site to scrape:
    url2 = 'https://www.facebook.com/newyorkindivisible/events/?ref=page_internal'
    time.sleep(2)
    driver.get(url2)

    # now grab events data
    # first i need to click see more at the bottom of the page a few times.
    time.sleep(2)
    # scroll down
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)


    # need to click the "see more" button at the bottom
    for i in range(10):
        seeMore = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "[aria-label='See more']"))).click()
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)
    
    # Get a dump of the HTML.
    pageSource = driver.execute_script("return document.body.innerHTML;")
    with open('page_source2.txt', 'w', encoding="utf-8") as htmlDump:
        soupData = bs(pageSource, 'html.parser')
        htmlDump.write(str(soupData.prettify()))

    driver.close()

def readsource_gnv(filename):
    with open(filename) as htmlDump:
        soupData = bs(htmlDump, 'html.parser')

    raw_titles = soupData.find_all('span', class_="")
    raw_locations = soupData.find_all('span', class_="x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x1lkfr7t x1lbecb7 xo1l8bm xzsf02u x1yc453h")
    raw_dates = soupData.find_all('span', class_="x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa x1s688f x1a1m0xk x1yc453h")

    for t in raw_titles:
        if (str(t).startswith('<span class="">') 
        and string.ascii_letters.count(str(t)[44])):
            titles.append(str(t)[44:-35])

    if not (len(titles) == len(raw_locations) == len(raw_dates)): 
        print("Invalid html input")
        exit()
        
    # this for loop assumes that len(titles) == len(locations) == len(dates)
    for i in range(len(titles)):
        l = raw_locations[i]
        d = raw_dates[i]

        locStart = str(l).rfind(' - ') + 3
        locEnd = str(l).rfind('\n')
        l = (str(l)[locStart:locEnd])

        if not (re.search('(\d{5})', l)): 
            titles[i] = 'TO_REMOVE'
            continue
        
        zcodes.append(int(re.search(r'(\d{5})', l).group(0)))

        datStart = str(d).find('\n') + 26
        datEnd = str(d).rfind('\n')
        d = (str(d)[datStart:datEnd])

        l = l[re.search(r"(\d)", l).start():]
        locations.append(l)
        dates.append(d)
    
    ourData['titles'] = [t for t in titles if t != 'TO_REMOVE']
    ourData['locations'] = locations
    ourData['zcodes'] = zcodes
    ourData['dates'] = dates


def readsource_ny(filename):
    with open(filename) as htmlDump:
        soupData = bs(htmlDump, 'html.parser')
    
    raw_titles = soupData.find_all('span', class_="")
    raw_locations = soupData.find_all('span', class_="x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x1lkfr7t x1lbecb7 xo1l8bm xzsf02u x1yc453h")
    raw_dates = soupData.find_all('span', class_="x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x676frb x1nxh6w3 x1sibtaa x1s688f x1a1m0xk x1yc453h")

    for t in raw_titles:
        if (str(t).startswith('<span class="">') 
        and string.ascii_letters.count(str(t)[44])):
            titles.append(str(t)[44:-35])

    if not (len(titles) == len(raw_locations) == len(raw_dates)): 
        print("Invalid html input")
        exit()
        
    # this for loop assumes that len(titles) == len(locations) == len(dates)
    for i in range(len(titles)):
        l = raw_locations[i]
        d = raw_dates[i]

        locStart = str(l).rfind(' - ') + 3
        locEnd = str(l).rfind('\n')
        l = (str(l)[locStart:locEnd])

        if not (re.search('(\d{5})', l)): 
            titles[i] = 'TO_REMOVE'
            continue

        if ('Zoom' in l):
            titles[i] = 'TO_REMOVE'
            continue
        zcodes.append(int(re.search(r'(\d{5})', l).group(0)))

        datStart = str(d).find('\n') + 26
        datEnd = str(d).rfind('\n')
        d = (str(d)[datStart:datEnd])

        l = l[re.search(r"(\d)", l).start():]

        locations.append(l)
        dates.append(d)
    ourDataNY['titles'] = [t for t in titles if t != 'TO_REMOVE']
    ourDataNY['locations'] = locations
    ourDataNY['zcodes'] = zcodes
    ourDataNY['dates'] = dates


def write_json(ourData, filename = "protest_data"):

    ourData.to_json(filename + '.json', 'records')
    ourData.to_excel(filename + '.xlsx')

############ ACTUAL SCRIPT

titles = []
locations = []
zcodes = []
dates = []
ourData = pd.DataFrame({
    'titles':titles,
    'locations':locations, 
    'zcodes': zcodes,
    'dates':dates
})

ourDataNY = pd.DataFrame({
    'titles':titles,
    'locations':locations, 
    'zcodes': zcodes,
    'dates':dates
})

if (len(sys.argv) == 2):
    if ('s' in sys.argv[1]):
            scrape_gnv()
            scrape_ny()

    if ('r' in sys.argv[1]):
        readsource_gnv('page_source.txt')
        # reset the variables
        titles = []
        locations = []
        zcodes = []
        dates = []
        readsource_ny('page_source2.txt')
        # combine the two dataframes
        combined = pd.concat([ourData, ourDataNY], ignore_index=True)
        # write the combined dataframe
        write_json(combined)
        print("Dumped data to protest_data.json and protest_data.xlsx")
elif (len(sys.argv) == 1): 
    print("Please add flags to tell me what to do.")
    print("'s': Scrape - Gather data and write to page_source.txt.")
    print("'r': Read - Read from page_source.txt and write to protest_data.json and protest_data.xlsx.")
else:
    print("Too many arguments. Please use format 'py main.py sr'")