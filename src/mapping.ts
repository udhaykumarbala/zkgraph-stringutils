//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, Event} from "@hyperoracle/zkgraph-lib";
import { TwoString } from "./events/twostring";
import { until, beyond, find, rfind, concat } from "./utils/basics";
import { esig_until, esig_beyond, esig_find, esig_rfind, esig_concat } from "./constants/function-sig";
import { addr, destinationFunction } from "./constants/contract";

export function handleBlocks(blocks: Block[]): Bytes {
  // init output state
  let calculatedWithFunctionHash: Bytes = Bytes.fromHexString("0x");

  // #1 can access all (matched) events of the latest block
  let events: Event[] = blocks[0].events;

  // #2 also can access (matched) events of a given account address (should present in yaml first).
  // a subset of 'events'
  let eventsByAcct: Event[] = blocks[0].account(addr).events;

  require(eventsByAcct.length > 0);

  let eventsByAcctEsigUntil: Event[] = blocks[0].account(addr).eventsByEsig(esig_until)
  let eventsByAcctEsigBeyond: Event[] = blocks[0].account(addr).eventsByEsig(esig_beyond)
  let eventsByAcctEsigFind: Event[] = blocks[0].account(addr).eventsByEsig(esig_find)
  let eventsByAcctEsigRfind: Event[] = blocks[0].account(addr).eventsByEsig(esig_rfind)
  let eventsByAcctEsigConcat: Event[] = blocks[0].account(addr).eventsByEsig(esig_concat)

  let result: string = "";
  let isEventExist: bool = false;

  if (eventsByAcctEsigUntil.length > 0) {
    let event = eventsByAcctEsigUntil[0];
    let twostring = TwoString.fromEvent(event);

    result = until(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigBeyond.length > 0) {
    let event = eventsByAcctEsigBeyond[0];
    let twostring = TwoString.fromEvent(event);

    
    result = beyond(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigFind.length > 0) {
    let event = eventsByAcctEsigFind[0];
    let twostring = TwoString.fromEvent(event);

    result = find(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigRfind.length > 0) {
    let event = eventsByAcctEsigRfind[0];
    let twostring = TwoString.fromEvent(event);

    result = rfind(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigConcat.length > 0) {
    let event = eventsByAcctEsigConcat[0];
    let twostring = TwoString.fromEvent(event);

    result = concat(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  require(isEventExist);

  for (let i = events.length - 1; i >= 0; i--) {
    if (
      events[i].address == addr &&
      (events[i].esig == esig_until ||
        events[i].esig == esig_beyond ||
        events[i].esig == esig_find ||
        events[i].esig == esig_rfind ||
        events[i].esig == esig_concat)
    ) {
      
      // merging the function hash with the calculated value to create calldata
      calculatedWithFunctionHash = Bytes.fromHexString(
        destinationFunction + Bytes.fromUTF8(result).toHexString().padStart(64, "0")
      );

    }
  }

  return calculatedWithFunctionHash;
}


