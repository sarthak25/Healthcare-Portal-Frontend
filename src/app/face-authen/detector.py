import cv2,os
import numpy as np
from PIL import Image 
import pickle
import sys
import pandas as pd

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('trainer/trainer.yml')
cascadePath = "Classifiers/face.xml"
faceCascade = cv2.CascadeClassifier(cascadePath);
path = 'dataSet'

dict_people = {}        
dict_detected = {}

with open('hash_faces.txt', 'r') as file:
    for line in file:
        person_id = int(line[:line.index(' ')])
        person_name = line[line.index(' ')+1 : -1]
        dict_people[person_id] = person_name
        dict_detected[person_name] = "Absent"

            
cam = cv2.VideoCapture(0)
font = cv2.cv.InitFont(cv2.CV_FONT_HERSHEY_SIMPLEX, 1, 1, 0, 1, 1) #Creates a font
font = cv2.FONT_HERSHEY_SIMPLEX

    
while True:
    try:
        ret, im = cam.read()
        im = np.array(im, dtype=np.uint8)
        gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        #gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
        faces=faceCascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5, minSize=(100, 100), flags=cv2.CASCADE_SCALE_IMAGE)
        for(x,y,w,h) in faces:
            nbr_predicted, conf = recognizer.predict(gray[y:y+h,x:x+w])
            cv2.rectangle(im,(x-50,y-50),(x+w+50,y+h+50),(225,0,0),2)
            print(nbr_predicted)
            cv2.putText(im,text = str(dict_people[nbr_predicted]), org = (x,y+h+50) ,fontFace = font, fontScale = 1.0, lineType = cv2.LINE_AA, thickness = 5, color=(0,0,255)) #Draw the text

            dict_detected[dict_people[nbr_predicted]] = "Present"
            
        cv2.imshow('im',im)
        cv2.waitKey(10)
        
    except KeyboardInterrupt:
        sys.exit(0)
