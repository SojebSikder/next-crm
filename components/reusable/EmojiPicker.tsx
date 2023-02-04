import dynamic from "next/dynamic";
import React from "react";

// import in client side to avoid "document is not defined"
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
export default function EmojiPicker({
  onEmojiClick,
  ...props
}: {
  onEmojiClick?: any;
}) {
  return (
    <Picker
      onEmojiClick={onEmojiClick}
      autoFocusSearch={false}
      {...props}
      // theme={Theme.AUTO}
      // searchDisabled
      // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
      // height={350}
      // width="50%"
      // emojiVersion="0.6"
      // lazyLoadEmojis={true}
      // previewConfig={{
      //   defaultCaption: "Pick one!",
      //   defaultEmoji: "1f92a" // 🤪
      // }}
      // suggestedEmojisMode={SuggestionMode.RECENT}
      // skinTonesDisabled
      // searchPlaceHolder="Filter"
      // defaultSkinTone={SkinTones.MEDIUM}
      // emojiStyle={EmojiStyle.NATIVE}
      // categories={[
      //   {
      //     name: "Fun and Games",
      //     category: Categories.ACTIVITIES
      //   },
      //   {
      //     name: "Smiles & Emotions",
      //     category: Categories.SMILEYS_PEOPLE
      //   },
      //   {
      //     name: "Flags",
      //     category: Categories.FLAGS
      //   },
      //   {
      //     name: "Yum Yum",
      //     category: Categories.FOOD_DRINK
      //   }
      // ]}
    />
  );
}
