#include <iostream>
#include <string>
#include <sstream>

std::string WildcardCharacters(const std::string& str) {
    // Getting the strings to analyze
    size_t breakpoint = str.find(' ');
    std::string wildCard = str.substr(0, breakpoint);
    std::string result = str.substr(breakpoint + 1, str.length() - breakpoint);

    // Step through the wildcard to validate the rule
    size_t index = 0;
    size_t step = 0;

    while (index < wildCard.length()) {
        // Checking symbol
        if (wildCard[index] == '+') {
            step++;
        } else if (wildCard[index] == '*') {
            int sequenceLength = 3;

            // Condition to analyze sequence character
            // Checking if it falls under default repetition of 3 or if it was assigned a length
            if (index + 1 < wildCard.length() && wildCard[index + 1] == '{') {
                // Getting the length
                std::string num;
                index++;

                while (wildCard[index] != '}') {
                    if (wildCard[index] >= '0' && wildCard[index] <= '9') {
                        num += wildCard[index];
                    }
                    index++;
                }

                // Converting the gathered number string to an int
                std::istringstream convert(num);
                convert >> sequenceLength;
            }

            // First checking for out of bounds
            if (step + sequenceLength - 1 >= result.length()) {
                return "false";
            } else {
                // Loop to ensure the characters are the same in a sequence
                char tempChar = result[step];
                while (sequenceLength > 0) {
                    if (result[step] != tempChar) {
                        return "false";
                    }

                    sequenceLength--;
                    step++;
                }
            }
        }

        index++;
    }

    // Ensure the traversal was parallel
    // In other words, for the rules to have been met in the result string, we needed to cover everything without any errors
    if (step != result.length()) {
        return "false";
    }

    return "true";
}

int main() {
    std::string input = "+abc *bcd"; // Example input
    std::cout << WildcardCharacters(input) << std::endl;
    return 0;
}