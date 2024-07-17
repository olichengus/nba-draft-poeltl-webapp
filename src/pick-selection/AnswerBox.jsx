// dir: UP || DOWN
// score: GREY || GREEN || YELLOW
// value: any
import { Container, HStack, Text, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

function AnswerBox({ dir, score, value }) {
    const GREY = 'grey';
    const GREEN = 'green.300';
    const YELLOW = 'yellow';
    const [loading, setLoading] = useState(false);
    const [arrow, setArrow] = useState(<></>);
    const [colour, setColour] = useState(GREY);
    useEffect(() => {
        setLoading(true);
        findArrow(dir);
        findColour(score);
        setLoading(false);
    }, []);

    function findArrow(dir) {
        switch(dir){
            case 'UP':
                return setArrow(<ArrowUpIcon color={"black"} />);
            case 'DOWN':
                return setArrow(<ArrowDownIcon color={"black"}/>);
            case 'SAME':
                break ;
            default:
                return ;
        }
    }

    function findColour(score) {
        switch(score){
            case 'GREY':
                return setColour(GREY);
            case 'GREEN':
                return setColour(GREEN);
            case 'YELLOW':
                return setColour(YELLOW);
            default:
                return;
    }
}
  return (
    <div>
        {!loading &&
        <Box bg={colour} display="inline-block" p={2} m="auto">
            <HStack>
                <Text color={"black"}>  
                {value}  
                </Text>  
                {arrow}
            </HStack>
        </Box>  
        }
    </div>
  );
}
export default AnswerBox;