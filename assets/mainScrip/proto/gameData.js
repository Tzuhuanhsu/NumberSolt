/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.gameData = (function() {

    /**
     * Namespace gameData.
     * @exports gameData
     * @namespace
     */
    var gameData = {};

    gameData.dataStrut = (function() {

        /**
         * Properties of a dataStrut.
         * @memberof gameData
         * @interface IdataStrut
         * @property {number|null} [gameId] dataStrut gameId
         * @property {number|null} [accountID] dataStrut accountID
         * @property {string|null} [info] dataStrut info
         */

        /**
         * Constructs a new dataStrut.
         * @memberof gameData
         * @classdesc Represents a dataStrut.
         * @implements IdataStrut
         * @constructor
         * @param {gameData.IdataStrut=} [properties] Properties to set
         */
        function dataStrut(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * dataStrut gameId.
         * @member {number} gameId
         * @memberof gameData.dataStrut
         * @instance
         */
        dataStrut.prototype.gameId = 0;

        /**
         * dataStrut accountID.
         * @member {number} accountID
         * @memberof gameData.dataStrut
         * @instance
         */
        dataStrut.prototype.accountID = 0;

        /**
         * dataStrut info.
         * @member {string} info
         * @memberof gameData.dataStrut
         * @instance
         */
        dataStrut.prototype.info = "";

        /**
         * Creates a new dataStrut instance using the specified properties.
         * @function create
         * @memberof gameData.dataStrut
         * @static
         * @param {gameData.IdataStrut=} [properties] Properties to set
         * @returns {gameData.dataStrut} dataStrut instance
         */
        dataStrut.create = function create(properties) {
            return new dataStrut(properties);
        };

        /**
         * Encodes the specified dataStrut message. Does not implicitly {@link gameData.dataStrut.verify|verify} messages.
         * @function encode
         * @memberof gameData.dataStrut
         * @static
         * @param {gameData.IdataStrut} message dataStrut message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        dataStrut.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.accountID != null && Object.hasOwnProperty.call(message, "accountID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.accountID);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.info);
            return writer;
        };

        /**
         * Encodes the specified dataStrut message, length delimited. Does not implicitly {@link gameData.dataStrut.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameData.dataStrut
         * @static
         * @param {gameData.IdataStrut} message dataStrut message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        dataStrut.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a dataStrut message from the specified reader or buffer.
         * @function decode
         * @memberof gameData.dataStrut
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameData.dataStrut} dataStrut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        dataStrut.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameData.dataStrut();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        message.accountID = reader.int32();
                        break;
                    }
                case 3: {
                        message.info = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a dataStrut message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameData.dataStrut
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameData.dataStrut} dataStrut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        dataStrut.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a dataStrut message.
         * @function verify
         * @memberof gameData.dataStrut
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        dataStrut.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.accountID != null && message.hasOwnProperty("accountID"))
                if (!$util.isInteger(message.accountID))
                    return "accountID: integer expected";
            if (message.info != null && message.hasOwnProperty("info"))
                if (!$util.isString(message.info))
                    return "info: string expected";
            return null;
        };

        /**
         * Creates a dataStrut message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameData.dataStrut
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameData.dataStrut} dataStrut
         */
        dataStrut.fromObject = function fromObject(object) {
            if (object instanceof $root.gameData.dataStrut)
                return object;
            var message = new $root.gameData.dataStrut();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.accountID != null)
                message.accountID = object.accountID | 0;
            if (object.info != null)
                message.info = String(object.info);
            return message;
        };

        /**
         * Creates a plain object from a dataStrut message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameData.dataStrut
         * @static
         * @param {gameData.dataStrut} message dataStrut
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        dataStrut.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.accountID = 0;
                object.info = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.accountID != null && message.hasOwnProperty("accountID"))
                object.accountID = message.accountID;
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = message.info;
            return object;
        };

        /**
         * Converts this dataStrut to JSON.
         * @function toJSON
         * @memberof gameData.dataStrut
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        dataStrut.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for dataStrut
         * @function getTypeUrl
         * @memberof gameData.dataStrut
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        dataStrut.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameData.dataStrut";
        };

        return dataStrut;
    })();

    return gameData;
})();

module.exports = $root;
