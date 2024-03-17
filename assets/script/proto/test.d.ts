import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace mallProto. */
export namespace mallProto {

    /** Properties of a MallReq. */
    interface IMallReq {

        /** MallReq apiID */
        apiID?: (number|null);

        /** MallReq accountID */
        accountID?: (number|null);

        /** MallReq lang */
        lang?: (string|null);
    }

    /** Represents a MallReq. */
    class MallReq implements IMallReq {

        /**
         * Constructs a new MallReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: mallProto.IMallReq);

        /** MallReq apiID. */
        public apiID: number;

        /** MallReq accountID. */
        public accountID: number;

        /** MallReq lang. */
        public lang: string;

        /**
         * Creates a new MallReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallReq instance
         */
        public static create(properties?: mallProto.IMallReq): mallProto.MallReq;

        /**
         * Encodes the specified MallReq message. Does not implicitly {@link mallProto.MallReq.verify|verify} messages.
         * @param message MallReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: mallProto.IMallReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallReq message, length delimited. Does not implicitly {@link mallProto.MallReq.verify|verify} messages.
         * @param message MallReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: mallProto.IMallReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mallProto.MallReq;

        /**
         * Decodes a MallReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mallProto.MallReq;

        /**
         * Verifies a MallReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallReq
         */
        public static fromObject(object: { [k: string]: any }): mallProto.MallReq;

        /**
         * Creates a plain object from a MallReq message. Also converts values to other types if specified.
         * @param message MallReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: mallProto.MallReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MallReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
