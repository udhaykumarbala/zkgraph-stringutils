function until (slice: string, needle: string): string {
    let index = slice.indexOf(needle);
  
    if (index == -1) {
      return "";
    } else {
      return slice.slice(0, index);
    }
  }
  
  function beyond (slice: string, needle: string): string {
    let index = slice.indexOf(needle);
  
    if (index == -1) {
      return "";
    } else {
      return slice.slice(index+1, slice.length);
    }
  
  }
  
  function find (slice: string, needle: string): string {
    let index = slice.indexOf(needle);
  
    if (index == -1) {
      return slice;
    } else {
      return slice.slice(index, index + needle.length);
    }
  }
  
  
  function rfind (slice: string, needle: string): string {
    let index = slice.lastIndexOf(needle);
    
    if (index == -1) {
      return slice;
    } else {
      return slice.slice(0, index+needle.length);
    }
  
  }
  
  function concat (slice1: string, slice2: string): string {
    return slice1 + slice2;
  }

export {
    until,
    beyond,
    find,
    rfind,
    concat
}