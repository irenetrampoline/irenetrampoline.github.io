import csv

f = open('d3_hours_worked.csv', 'rb')
freader = csv.DictReader(f)

g = open('d3_hours_worked_norm.csv', 'wb')

header_set = False

for info in freader:
	if not header_set:
		headers = ['country'] + sorted([i for i in info.keys() if i != 'country'])
		gwriter = csv.DictWriter(g, fieldnames = headers)
		gwriter.writeheader()
		header_set = True
	if info['country'] == 'Russia':
		for month in [j for j in info.keys() if j != 'country']:
			info[month] = float(info[month]) / 1.25
	gwriter.writerow(info)

f.close()
g.close()