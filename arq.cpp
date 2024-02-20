#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define TIMEOUT 5
#define PACKET_SIZE 1024

void sendPacket(int packetNum) {
    printf("Sending packet %d\n", packetNum);
    sleep(1); 
}

int receiveAck() {
    return rand() % 2; }

int main() {
    int totalPackets = 10; 
    int packetNum = 0; 

    while (packetNum < totalPackets) {
        sendPacket(packetNum);

        int ackReceived = 0;
        int timeout = TIMEOUT;

        while (!ackReceived && timeout > 0) {
            ackReceived = receiveAck();
            if (!ackReceived) {
                printf("Timeout occurred. Resending packet %d\n", packetNum);
                sendPacket(packetNum); 
                timeout--;
            }
        }

        if (ackReceived) {
            printf("Acknowledgment received for packet %d\n", packetNum);
            packetNum++; 
        } else {
            printf("Max retransmissions reached for packet %d. Aborting.\n", packetNum);
            break;
        }
    }

    printf("Transmission completed.\n");

    return 0;
}
