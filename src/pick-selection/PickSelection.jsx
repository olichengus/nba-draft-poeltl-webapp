import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Box, Stack, Heading,Text, StackDivider, HStack } from '@chakra-ui/react';
import AnswerBox from "./AnswerBox";

export function PickSelection({pickNumber, guess}) {
    useEffect(() => {
        console.log(guess);
    }, [guess]);
    return (
        <div>
                <Card
                    w={'100%'}
                    h={'50%'}
                    backgroundColor="black"   
                    borderColor="white"   
                    borderWidth="1px"
                    p={5}
                    >  
                        <CardHeader fontSize={"large"} alignSelf="flex-start">  {/* alignSelf: 'flex-start' will align to left in Card */}  
                            <Heading size='md' color="white"> {"With the #" + pickNumber + " Overall Pick..."} </Heading>  
                        </CardHeader> 

                        <CardBody fontSize={'sm'} paddingTop={3}>
                                <Stack spacing='2'>
                                <Box>
                                        <HStack>
                                                <Text>
                                                You have selected 
                                                </Text>
                                                <AnswerBox dir="" score={guess.player_name.score} value={guess.player_name.value} />
                                                <AnswerBox dir='NONE' score={guess.position.score} value={guess.position.value} />
                                                <Text>, from </Text>
                                                <AnswerBox dir='NONE' score={guess.college.score} value={guess.college.value} />
                                        </HStack>
                                </Box>
                                <Box>
                                        <HStack>
                                                <Text>
                                                        Drafted by the 
                                                </Text>
                                                <AnswerBox dir='NONE' score={guess.team.score} value={guess.team.value} />
                                                <Text>with the </Text>
                                                <AnswerBox dir={guess.pick.dir} score={guess.pick.score} value={guess.pick.value} />
                                                <Text>
                                                        pick in the 
                                                </Text>
                                                <AnswerBox dir='NONE' score={guess.round.score} value={guess.round.value} />
                                                <Text> round of the </Text>
                                                <AnswerBox dir={guess.year.dir} score={guess.year.score} value={guess.year.value} />
                                                <Text> NBA Draft </Text>
                                        </HStack>
                                </Box>
                                </Stack>
                        </CardBody>
                </Card>
            
        </div>
    );
}

export default PickSelection;