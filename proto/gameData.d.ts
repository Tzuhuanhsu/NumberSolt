import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace gameData. */
export namespace gameData {

    /** Properties of a dataStrut. */
    interface IdataStrut {

        /** dataStrut gameId */
        gameId?: (number|null);

        /** dataStrut accountID */
        accountID?: (number|null);

        /** dataStrut info */
        info?: (string|null);
    }

    /** Represents a dataStrut. */
    class dataStrut implements IdataStrut {

        /**
         * Constructs a new dataStrut.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameData.IdataStrut);

        /** dataStrut gameId. */
        public gameId: number;

        /** dataStrut accountID. */
        public accountID: number;

        /** dataStrut info. */
        public info: string;

        /**
         * Creates a new dataStrut instance using the specified properties.
         * @param [properties] Properties to set
         * @returns dataStrut instance
         */
        public static create(properties?: gameData.IdataStrut): gameData.dataStrut;

        /**
         * Encodes the specified dataStrut message. Does not implicitly {@link gameData.dataStrut.verify|verify} messages.
         * @param message dataStrut message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameData.IdataStrut, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified dataStrut message, length delimited. Does not implicitly {@link gameData.dataStrut.verify|verify} messages.
         * @param message dataStrut message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameData.IdataStrut, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a dataStrut message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns dataStrut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameData.dataStrut;

        /**
         * Decodes a dataStrut message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns dataStrut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameData.dataStrut;

        /**
         * Verifies a dataStrut message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a dataStrut message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns dataStrut
         */
        public static fromObject(object: { [k: string]: any }): gameData.dataStrut;

        /**
         * Creates a plain object from a dataStrut message. Also converts values to other types if specified.
         * @param message dataStrut
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameData.dataStrut, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this dataStrut to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for dataStrut
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
