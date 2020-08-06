#!/usr/bin/env python
# -*- coding: utf-8 -*-
import yaml


def id_of(label):
    return str(abs(hash(label)) % (10 ** 8))


def get_value(a, b):
    ret = a / b - 0.00000001
    return ret


def process_label(label):
    if label.startswith('>'):
        return "&#8659;<br>" + label[2:]
    return label


class Map:
    def __init__(self, file, root, label):
        self.file = file
        self.root = root
        self.label = label
        self.ids = [id_of(root)]
        self.labels = [label]
        self.parents = [""]
        self.texts = [label]
        self.values = [1]
        self.parse()

    def parse(self):
        with open(self.file, 'r') as stream:
            try:
                map = yaml.safe_load(stream)
                self.render(1.0, self.root, map)
            except yaml.YAMLError as exc:
                print(exc)
                raise ("Error")

    def render(self, value, root, children):
        value = get_value(value, len(children))
        # print("root: " + root + " child:" + str(len(children)) + " value: " + str(value))
        for child in children:
            if type(child) is dict:
                parent = next(iter(child))
                self.render_item(value, root, parent)
                self.render(value, parent, child[parent])
            else:
                self.render_item(value, root, child)

    def render_item(self, value, parent, child):
        label = child
        info = ''
        if '|' in child:
            label, info = child.split('|')
            if info.strip().startswith('_'):
                info = ''
            else:
                print('XXXX' + info + "ll")
        label = process_label(label)
        print(id_of(child) + ", " + label + ", " + id_of(parent) + ", " + info + ", " + str(value))
        self.ids.append(id_of(child))
        self.labels.append(label)
        self.parents.append(id_of(parent))
        self.texts.append(info)
        self.values.append(value)

    def save_to(self, output_file):
        f = open(output_file, "w+")
        f.write('[{\n')
        f.write('  "type": "sunburst",\n')
        f.write('  "maxdepth": 3,\n')
        f.write('  "hoverinfo": "text",\n')
        f.write('  "hovertext": "",\n')
        f.write('  "textinfo": "label",\n')
        f.write('  "branchvalues": "total",\n')
        f.write('  "count": "leaves",\n')
        f.write('  "title": "' + self.label + '",\n')
        f.write('  "ids": ' + str(self.ids).replace("\'", '"') + ",\n")
        f.write('  "labels": ' + str(self.labels).replace("\'", '"') + ",\n")
        f.write('  "parents": ' + str(self.parents).replace("\'", '"') + ",\n")
        f.write('  "text": ' + str(self.texts).replace("\'", '"') + ",\n")
        f.write('  "values": ' + str(self.values) + "\n")
        f.write('}]\n')
        f.close()


aroma = Map('../src/data/aroma-source.yml', 'root', 'Aroma')
aroma.save_to("../src/data/aroma-data.json")

flavor = Map('../src/data/flavor-source.yml', 'root', 'Flavor')
flavor.save_to("../src/data/flavor-data.json")
