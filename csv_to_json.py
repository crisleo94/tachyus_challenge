import csv
import json


def csv_to_json(csv_file_path, json_file_path):
    json_array = []

    with open(csv_file_path, encoding='utf8') as csvf:
      csv_reader = csv.DictReader(csvf)

      for row in csv_reader:
          json_array.append(row)


    with open(json_file_path, 'w', encoding='utf8') as jsonf:
      json_string = json.dumps(json_array, indent=4)
      jsonf.write(json_string)

csv_path = './src/assets/data/production.csv'
json_path = './src/assets/data/production.json'

csv_to_json(csv_path, json_path)