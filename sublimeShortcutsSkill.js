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

const languageStrings = {
    'en': {
        translation: {
            KEYPRESSES: [
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
                "alt plus period",
            ],
            COMMANDS: [
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
                "close current html tag",
            ],
            SKILL_NAME: 'Sublime Shortcuts',
            GET_SHORTCUT_MESSAGE: "Here's a random shortcut: ",
            KEYPRESS_TRANSITION_MESSAGE: " is a shortcut for ",
            HELP_MESSAGE: 'You can say tell me a sublime shortcut, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetShortcut');
    },
    'GetRandomShortcutIntent': function () {
        this.emit('GetShortcut');
    },
    'GetShortcut': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const keypresses = this.t('KEYPRESSES');
        const commands = this.t('COMMANDS');

        const shortcutIndex = Math.floor(Math.random() * keypresses.length);
        const randomShortcut = keypresses[shortcutIndex] + this.t('KEYPRESS_TRANSITION_MESSAGE') + commands[shortcutIndex];

        // Create speech output
        const speechOutput = this.t('GET_SHORTCUT_MESSAGE') + randomShortcut;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomShortcut);
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
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
