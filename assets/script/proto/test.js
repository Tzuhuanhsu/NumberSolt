/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.mallProto = (function() {

    /**
     * Namespace mallProto.
     * @exports mallProto
     * @namespace
     */
    var mallProto = {};

    mallProto.MallReq = (function() {

        /**
         * Properties of a MallReq.
         * @memberof mallProto
         * @interface IMallReq
         * @property {number|null} [apiID] MallReq apiID
         * @property {number|null} [accountID] MallReq accountID
         * @property {string|null} [lang] MallReq lang
         */

        /**
         * Constructs a new MallReq.
         * @memberof mallProto
         * @classdesc Represents a MallReq.
         * @implements IMallReq
         * @constructor
         * @param {mallProto.IMallReq=} [properties] Properties to set
         */
        function MallReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MallReq apiID.
         * @member {number} apiID
         * @memberof mallProto.MallReq
         * @instance
         */
        MallReq.prototype.apiID = 0;

        /**
         * MallReq accountID.
         * @member {number} accountID
         * @memberof mallProto.MallReq
         * @instance
         */
        MallReq.prototype.accountID = 0;

        /**
         * MallReq lang.
         * @member {string} lang
         * @memberof mallProto.MallReq
         * @instance
         */
        MallReq.prototype.lang = "";

        /**
         * Creates a new MallReq instance using the specified properties.
         * @function create
         * @memberof mallProto.MallReq
         * @static
         * @param {mallProto.IMallReq=} [properties] Properties to set
         * @returns {mallProto.MallReq} MallReq instance
         */
        MallReq.create = function create(properties) {
            return new MallReq(properties);
        };

        /**
         * Encodes the specified MallReq message. Does not implicitly {@link mallProto.MallReq.verify|verify} messages.
         * @function encode
         * @memberof mallProto.MallReq
         * @static
         * @param {mallProto.IMallReq} message MallReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.apiID != null && Object.hasOwnProperty.call(message, "apiID"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.apiID);
            if (message.accountID != null && Object.hasOwnProperty.call(message, "accountID"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.accountID);
            if (message.lang != null && Object.hasOwnProperty.call(message, "lang"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.lang);
            return writer;
        };

        /**
         * Encodes the specified MallReq message, length delimited. Does not implicitly {@link mallProto.MallReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mallProto.MallReq
         * @static
         * @param {mallProto.IMallReq} message MallReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallReq message from the specified reader or buffer.
         * @function decode
         * @memberof mallProto.MallReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mallProto.MallReq} MallReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mallProto.MallReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.apiID = reader.int32();
                        break;
                    }
                case 2: {
                        message.accountID = reader.int32();
                        break;
                    }
                case 3: {
                        message.lang = reader.string();
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
         * Decodes a MallReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mallProto.MallReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mallProto.MallReq} MallReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallReq message.
         * @function verify
         * @memberof mallProto.MallReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.apiID != null && message.hasOwnProperty("apiID"))
                if (!$util.isInteger(message.apiID))
                    return "apiID: integer expected";
            if (message.accountID != null && message.hasOwnProperty("accountID"))
                if (!$util.isInteger(message.accountID))
                    return "accountID: integer expected";
            if (message.lang != null && message.hasOwnProperty("lang"))
                if (!$util.isString(message.lang))
                    return "lang: string expected";
            return null;
        };

        /**
         * Creates a MallReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mallProto.MallReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mallProto.MallReq} MallReq
         */
        MallReq.fromObject = function fromObject(object) {
            if (object instanceof $root.mallProto.MallReq)
                return object;
            var message = new $root.mallProto.MallReq();
            if (object.apiID != null)
                message.apiID = object.apiID | 0;
            if (object.accountID != null)
                message.accountID = object.accountID | 0;
            if (object.lang != null)
                message.lang = String(object.lang);
            return message;
        };

        /**
         * Creates a plain object from a MallReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mallProto.MallReq
         * @static
         * @param {mallProto.MallReq} message MallReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.apiID = 0;
                object.accountID = 0;
                object.lang = "";
            }
            if (message.apiID != null && message.hasOwnProperty("apiID"))
                object.apiID = message.apiID;
            if (message.accountID != null && message.hasOwnProperty("accountID"))
                object.accountID = message.accountID;
            if (message.lang != null && message.hasOwnProperty("lang"))
                object.lang = message.lang;
            return object;
        };

        /**
         * Converts this MallReq to JSON.
         * @function toJSON
         * @memberof mallProto.MallReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MallReq
         * @function getTypeUrl
         * @memberof mallProto.MallReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MallReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/mallProto.MallReq";
        };

        return MallReq;
    })();

    return mallProto;
})();

module.exports = $root;
