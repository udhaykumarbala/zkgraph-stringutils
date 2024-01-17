import { Bytes} from "@hyperoracle/zkgraph-lib";

const esig_until = Bytes.fromHexString('0xb210ae05de079c8a70587dd78abb12abf9e026404a3f73336b7ef22ab0f3f863');

const esig_beyond = Bytes.fromHexString('0x833204b0f1287665edfec99f3aa2b03446df15faca4bd4ccc1a7cea84571199e');

const esig_find = Bytes.fromHexString('0xb20c041f6c43cba208bc953ca1a88206192971cc30ff2310e76bc680a7785297');

const esig_rfind = Bytes.fromHexString('0x0775b21f5ec381c37c1c46c80636c6b7079b77e35462d1082ba5d013a32f78e1');

const esig_concat = Bytes.fromHexString('0xc403a8f5179114f328ff461ae8669e39dbcbc308c025dd177e8c8cce45ad4472');


export {
    esig_until,
    esig_beyond,
    esig_find,
    esig_rfind,
    esig_concat
}