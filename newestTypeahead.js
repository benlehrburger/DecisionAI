import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

export function Typeahead(val, setVal, words, populateWith, classLabel, color) {
    const [currentFocus, setCurrentFocus] = useState(0);
    const [choices, setChoices] = useState([]);
    const [currentToken, setCurrentToken] = useState();
    const inp = useRef();

    function choose(ixChoice) {
        console.log("choosing " + ixChoice);
        setVal(val + choices[ixChoice].substr(currentToken.length));
        setChoices([]);
    }

    function handleChange(event) {
        const newVal = event.target.value;
        setVal(newVal);
        const splitted = newVal.split(/\W+/);
        const last = splitted[splitted.length - 1];
        if (last.length > 0) {
            setChoices(
            populateWith
                .filter((w) => typeof w !== "undefined")
                .filter((w) => w.startsWith(last))
            );
            setCurrentToken(last);
        } else {
            setChoices([]);
        }
    }

    useEffect(() => {
        function handleKeyDown(e) {
          if (e.keyCode === 40) {
            // down
            e.preventDefault();
            setCurrentFocus((i) => (choices.length + i + 1) % choices.length);
          } else if (e.keyCode === 38) {
            //up
            e.preventDefault();
            setCurrentFocus((i) => (choices.length + i - 1) % choices.length);
          } else if (e.keyCode === 13) {
            // choose!
            if (choices.length > 0) {
              e.preventDefault();
              choose(currentFocus);
            }
          }
        }
    
        inp.current.addEventListener("keydown", handleKeyDown);
    
        return function cleanupListener() {
          inp.current.removeEventListener("keydown", handleKeyDown);
        };
      }, [choices, currentFocus]);

    return (
        <OuterContainer>
        <TextareaAutosize
            style={{ width: "100%" }}
            inputRef={(variable) => {
                inp.current = variable;
            }}
            value={val}
            onBlur={() => {
                setChoices([]);
              }}
            className={classLabel}
            onChange={(e) => {handleChange(e)}}
        />

        {choices.length > 0 && (
            <ItemsContainer>
              {choices.map((word, i) => (
                <div
                onMouseEnter={() => setCurrentFocus(i)}
                onMouseDown={(e) => {
                    e.preventDefault();
                    choose(i);
                }} // this works but "onClick" doesn't.
                style={{
                    zIndex: 1000,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 3,
                    backgroundColor: currentFocus === i ? "lightgrey" : color(word),
                }}
                >
                {word}
                </div>
              ))}
            </ItemsContainer>
        )}
        </OuterContainer>
    );
}

const OuterContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const ItemsContainer = styled.div`
  position: absolute;
  border: 1px solid black;
  border-top: none;
  z-index: 99;
  top: 80%; /*slightly overlap the text entry cell:*/
  left: 1;
  right: 1;
  background-color: white;
`;





