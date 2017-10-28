/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const shortcuts = {
	"keypressWithPlus": [
		"control plus x",
		"control plus enter",
		"control plus shift plus enter",
		"control plus shift plus up",
		"control plus shift plus down",
		"control plus l",
		"control plus d",
		"control plus m",
		"control plus shift plus m",
		"control plus shift plus k",
		"control plus k k",
		"control plus k plus backspace",
		"control plus right bracket",
		"control plus left bracket",
		"control plus shift plus d",
		"control plus j",
		"control plus slash",
		"control plus shift plus slash",
		"control plus y",
		"control plus shift plus v",
		"control plus space",
		"control plus u",
		"alt plus shift plus  w",
		"alt plus period"
	],
	"keypressWithoutPlus": [
		"control x",
		"control enter",
		"control shift enter",
		"control shift up",
		"control shift down",
		"control l",
		"control d",
		"control m",
		"control shift m",
		"control shift k",
		"control k k",
		"control k backspace",
		"control right bracket",
		"control left bracket",
		"control shift d",
		"control j",
		"control slash",
		"control shift slash",
		"control y",
		"control shift v",
		"control space",
		"control u",
		"alt shift  w",
		"alt period"
	],
	"commands": [
		"cut line",
		"insert line after",
		"insert line before",
		"move line or selection up",
		"move line or selection down",
		"select line then repeat to select next lines",
		"select word then repeat select others occurrences",
		"jump to closing parenthese",
		"select all contents of the current parentheses",
		"delete line",
		"delete from cursor to end of line",
		"delete from cursor to start of line",
		"indent current lines",
		"un-indent current lines",
		"duplicate lines",
		"join line below to the end of the current line",
		"comment or un-comment current line",
		"block comment current selection",
		"redo, or repeat last keyboard shortcut command",
		"paste and indent correctly",
		"select next auto-complete suggestion",
		"soft undo then  jumps to your last change befor",
		"wrap selection in html tag",
		"close current html tag"
	]
}

var keyToCommand = {};

for(var i=0; i<shortcuts.keypressWithPlus.length; i++) {
	keyToCommand[shortcuts.keypressWithPlus[i]] = shortcuts.commands[i];
	keyToCommand[shortcuts.keypressWithoutPlus[i]] = shortcuts.commands[i];
}


const languageStrings = {
	'en': {
		translation: {
			KEYPRESSES: shortcuts.keypressWithPlus.concat(shortcuts.keypressWithoutPlus),
			COMMANDS: shortcuts.commands,
			SKILL_NAME: 'Sublime Shortcuts',
			GET_SHORTCUT_MESSAGE: "Here's a random shortcut: ",
			KEYPRESS_TRANSITION_MESSAGE: " is a shortcut for ",
			HELP_MESSAGE: 'You can say tell me a sublime shortcut, or, you can say exit... What can I help you with?',
			HELP_REPROMPT: 'What can I help you with?',
			STOP_MESSAGE: 'Goodbye!',
			REPROMPT_SPEECH: 'Which other shortcut would you like to know about?'
		},
	}
};

function getItem(slots)
{
	console.log(JSON.stringify(slots));
	let propertyArray = ["Keyword"];
	let value;

	for (let slot in slots)
	{
		console.log("slot: " + JSON.stringify(slot));
		if (slots[slot].value !== undefined)
		{
			return slots[slot];
			// for (let property in propertyArray)
			// {
			// 	let item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
			// 	if (item.length > 0)
			// 	{
			// 		return item[0];
			// 	}
			// }
		}
	}

	return value;
}

function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + this.t('HELP_MESSAGE'); }

function getSpeechDescription(item)
{
    let sentence = keyToCommand[item.value];
    console.log(sentence);
    return sentence;
}

const handlers = {
	'LaunchRequest': function () {
		this.emit('GetRandomShortcutIntent');
	},
	'GetRandomShortcutIntent': function () {
		// Get a random space fact from the space facts list
		// Use this.t() to get corresponding language data
		const keypresses = this.t('KEYPRESSES');
		const commands = this.t('COMMANDS');

		const shortcutIndex = Math.floor(Math.random() * commands.length);
		const randomShortcut = keypresses[shortcutIndex] + this.t('KEYPRESS_TRANSITION_MESSAGE') + commands[shortcutIndex];

		// Create speech output
		const speechOutput = this.t('GET_SHORTCUT_MESSAGE') + randomShortcut;
		this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomShortcut);
	},
	'GetShortcutIntent': function() {
		let item = getItem(this.event.request.intent.slots);
		console.log(JSON.stringify(item));
		if (item)// && item["Keypress"] != undefined)// && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
		{
			this.response.speak(getSpeechDescription(item)).listen(this.t('REPROMPT_SPEECH'));
		}
		else
		{
			this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
		}

		this.emit(":responseReady");
	},
	'AMAZON.HelpIntent': function () {
		const speechOutput = this.t('HELP_MESSAGE');
		const reprompt = this.t('HELP_MESSAGE');
		this.emit(':ask', speechOutput, reprompt);
	},
	'AMAZON.CancelIntent': function () {
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'AMAZON.StopIntent': function () {
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'Unhandled': function() {
		const speechOutput = this.t('STOP_MESSAGE');
		this.response.speak(speechOutput).listen(speechOutput);
		this.emit(':responseReady');
	}
};

exports.handler = function (event, context) {
	const alexa = Alexa.handler(event, context);
	alexa.APP_ID = APP_ID;
	// To enable string internationalization (i18n) features, set a resources object.
	alexa.resources = languageStrings;
	alexa.registerHandlers(handlers);
	alexa.execute();
};
