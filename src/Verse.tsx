import * as Clipboard from "expo-clipboard";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { colors } from "./config/theme";
import { StandardWorksFlatVerse } from "./data/data.types";
import { buildCopyText, buildUrl } from "./utils/urlHelpers.utils";
import { Feather } from "@expo/vector-icons";

interface Props {
  verse: StandardWorksFlatVerse;
  searchString: string;
}

const Verse = ({ verse, searchString }: Props) => {
  const verseParts = verse.text.toLowerCase().split(searchString.toLowerCase());

  return (
    <View
      style={{
        backgroundColor: colors.cardGray,
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        padding: 16,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontWeight: "800",
        }}
      >
        {verse.reference}
      </Text>
      <Text
        style={{
          color: colors.text,
          paddingVertical: 8,
          fontSize: 16,
          lineHeight: 22,
        }}
      >
        {verseParts.map((textPart, index) => {
          if (verseParts.length - 1 === index) {
            return textPart;
          }

          return (
            <React.Fragment key={index}>
              {textPart}
              <Text
                style={{
                  color: colors.background,
                  backgroundColor: colors.linkBackground,
                  fontWeight: "bold",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                {searchString.toLowerCase()}
              </Text>
            </React.Fragment>
          );
        })}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "stretch",
          alignItems: "stretch",
        }}
      >
        <Pressable
          style={{
            marginVertical: 8,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            padding: 16,
            paddingVertical: 12,
            backgroundColor: colors.background,
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            marginRight: 1,
          }}
          onPress={() => Clipboard.setStringAsync(buildCopyText(verse))}
        >
          <Feather name="copy" size={18} color={colors.linkBackground} />
          <Text
            style={{
              marginLeft: 8,
              color: colors.linkBackground,
              fontWeight: "600",
            }}
          >
            Copy
          </Text>
        </Pressable>
        <Pressable
          style={{
            marginVertical: 8,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            padding: 16,
            paddingVertical: 12,
            backgroundColor: colors.background,
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            marginLeft: 1,
          }}
          onPress={() => Linking.openURL(buildUrl(verse))}
        >
          <Feather
            name="external-link"
            size={18}
            color={colors.linkBackground}
          />
          <Text
            style={{
              marginLeft: 8,
              color: colors.linkBackground,
              fontWeight: "600",
            }}
          >
            Open
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Verse;
