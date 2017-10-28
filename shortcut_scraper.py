# -*- coding: utf-8 -*-
import urllib2

# Calls HTTP GET on a url and rturns its payload formatted as JSON
def http_get(url):
	return urllib2.urlopen(url).read()

site_input = http_get("http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_win.html")
site_input_lines = site_input.split("\n")

file = open("output.txt", "w")

replace_key_name = {
	"↩": "enter",
	"⇧": "shift",
	"ctrl": "control",
	"+": "plus",
	".": "period",
	"↑": "up",
	"↓": "down",
	"⌫": "backspace",
	"]": "right bracket",
	"[": "left bracket",
	"/": "slash",
	"kk": "k k"
}

replace_command_name = {
	"/": " or ",
	" - ": " then ",
	";": " then ",
	"(s)": "s"
}

is_keypress = True

for index, line in enumerate(site_input_lines):
	td_index = line.find("<td>")
	if td_index is not -1:
		endtd_index = line.find("</td>")
		inner_text = line[td_index+4:endtd_index].lower()
		if is_keypress:
			for key in replace_key_name:
				inner_text = inner_text.replace(key, replace_key_name[key])
		else:
			for key in replace_command_name:
				inner_text = inner_text.replace(key, replace_command_name[key])
		file.write(inner_text + "\n")
		is_keypress = not is_keypress

file.close()