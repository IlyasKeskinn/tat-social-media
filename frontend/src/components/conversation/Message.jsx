import { Box, Text, useColorMode, Icon, Flex, Image, IconButton } from "@chakra-ui/react";
import { BsCheck, BsCheckAll, BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { IoMdTime } from "react-icons/io";
import WaveSurfer from "wavesurfer.js";
import PropTypes from "prop-types";


// Global state for currently playing audio
let currentlyPlayingWavesurfer = null;

const Message = ({ message, isOwnMessage }) => {
    const { colorMode } = useColorMode();
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [audioRate, setAudioRate] = useState(1);

    useEffect(() => {
        if (message.type === 'audio') {
            // WaveSurfer instance create
            wavesurferRef.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: isOwnMessage ? '#ffffff99' : '#A5BFCC',
                progressColor: '#040404',
                cursorColor: 'transparent',
                barWidth: 2,
                barGap: 3,
                barRadius: 3,
                height: 30,
                normalize: true,
                minPxPerSec: 1,

            });

            // Load audio file
            wavesurferRef.current.load(message.content);

            // Event listeners
            wavesurferRef.current.on('ready', () => {
                setDuration(wavesurferRef.current.getDuration());
            });

            wavesurferRef.current.on('audioprocess', () => {
                setCurrentTime(wavesurferRef.current.getCurrentTime());
            });

            wavesurferRef.current.on('play', () => {
                // If another audio is playing, pause it
                if (currentlyPlayingWavesurfer && currentlyPlayingWavesurfer !== wavesurferRef.current) {
                    currentlyPlayingWavesurfer.pause();
                }
                // Update the currently playing audio
                currentlyPlayingWavesurfer = wavesurferRef.current;
                setIsPlaying(true);
            });

            wavesurferRef.current.on('pause', () => {
                if (currentlyPlayingWavesurfer === wavesurferRef.current) {
                    currentlyPlayingWavesurfer = null;
                }
                setIsPlaying(false);
            });

            wavesurferRef.current.on('finish', () => {
                if (currentlyPlayingWavesurfer === wavesurferRef.current) {
                    currentlyPlayingWavesurfer = null;
                }
                setIsPlaying(false);
            });

            // Cleanup
            return () => {
                if (currentlyPlayingWavesurfer === wavesurferRef.current) {
                    currentlyPlayingWavesurfer = null;
                }
                wavesurferRef.current.destroy();
            };
        }
    }, [message.content, isOwnMessage]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (wavesurferRef.current) {
            if (isPlaying) {
                wavesurferRef.current.pause();
            } else {
                wavesurferRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    const handleChangeAudioRate = () => {
        if (wavesurferRef.current) {
            if (audioRate === 1) {
                wavesurferRef.current.setPlaybackRate(1.5);
                setAudioRate(1.5);
            } else if (audioRate === 1.5) {
                wavesurferRef.current.setPlaybackRate(2);
                setAudioRate(2);
            } else {
                wavesurferRef.current.setPlaybackRate(1);
                setAudioRate(1);
            }
        }
    };

    const getStatusIcon = () => {
        if (!isOwnMessage) return null;

        switch (message.status) {
            case 'sent':
                return <Icon as={BsCheck} color="whiteAlpha.800" />;
            case 'delivered':
                return <Icon as={BsCheckAll} color="whiteAlpha.800" />;
            case 'read':
                return <Icon as={BsCheckAll} color="blue.200" />;
            default:
                return <Icon as={IoMdTime} color="whiteAlpha.800" />;
        }
    };

    const renderMessageContent = () => {
        switch (message.type) {
            case 'image':
                return (
                    <Image
                        src={message.content}
                        alt="Message image"
                        borderRadius="md"
                        maxH="300px"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={() => window.open(message.content, '_blank')}
                        _hover={{ opacity: 0.9 }}
                    />
                );
            case 'audio':
                return (
                    <Flex direction="column">
                        <Flex align="center" gap={2} mb={2}>
                            <IconButton
                                icon={isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                                onClick={handlePlayPause}
                                isRound
                                size="sm"
                                colorScheme={isOwnMessage ? "whiteAlpha" : "gray"}
                            />
                            <Text fontSize="xs">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </Text>
                            <Box
                                as="button"
                                onClick={handleChangeAudioRate}
                                ml="auto"
                                px={2}
                                py={1}
                                borderRadius="md"
                                fontSize="xs"
                                bg={isOwnMessage ? "cyan.800" : "gray.700"}
                            >
                                {audioRate}x
                            </Box>
                        </Flex>
                        <Box
                            ref={waveformRef}
                            borderRadius="md"
                            overflow="hidden"
                        />
                    </Flex>
                );
            default: // text
                return <Text>{message.content}</Text>;
        }
    };

    return (
        <Box
            id={`message-${message._id}`}
            alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
            bgGradient={isOwnMessage
                ? "linear(to-r, blue.400,cyan.400)"
                : colorMode === "dark"
                    ? "linear(to-r, gray.600, gray.500)"
                    : "linear(to-r, gray.500, gray.600)"}
            color={isOwnMessage
                ? "white"
                : colorMode === "dark" ? "gray.100" : "gray.200"}
            px={4}
            py={2}
            borderRadius="lg"
            w={{sm: "350px", md: "300px", lg: "300px"}}
            boxShadow={isOwnMessage ? "lg" : "sm"}
            transition="all 0.2s"
        >
            {renderMessageContent()}
            <Flex
                justify="flex-end"
                align="center"
                gap={1}
                mt={1}
            >
                <Text
                    fontSize="xs"
                    opacity={0.8}
                    color={isOwnMessage
                        ? "whiteAlpha.900"
                        : colorMode === "dark" ? "gray.300" : "gray.500"}
                >
                    {new Date(message.createdAt).toLocaleTimeString()}
                </Text>
                {getStatusIcon()}
            </Flex>
        </Box>
    );
};

Message.propTypes = {
    message: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['text', 'image', 'audio']).isRequired,
        createdAt: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['sent', 'delivered', 'read', 'pending']),
        sender: PropTypes.shape({
            _id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    isOwnMessage: PropTypes.bool.isRequired
};

export default Message; 