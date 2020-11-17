import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";
import { Typeahead } from "../../newestTypeahead.js";

export function FormulaEditor(props) {
  const val = props.val;
  const setVal = props.setVal;
  const words = props.typeAheadWords;
  const populateWith = [...words['modelPrimitives'], ...words['functions']];
  const classLabel = props.className;

  var color = function pickColor(word){
    if (words['functions'].includes(word)){
      return '#C0CCF8';
    }
    else if (words['modelPrimitives'].includes(word)){
      return 'AliceBlue';
    }
    else{
      return null;
    }
  }
  
  return (
    Typeahead(val, setVal, words, populateWith, classLabel, color)
  );
}
