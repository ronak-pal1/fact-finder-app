import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import CustomText from "./CustomText";

const CalendarPicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [time, setTime] = useState({ hour: 11, minute: 38, period: "AM" });

  const startOfMonth = selectedDate.startOf("month");
  const daysInMonth = selectedDate.daysInMonth();
  const startDay = startOfMonth.day(); // Sunday = 0

  const handlePrevMonth = () =>
    setSelectedDate(selectedDate.subtract(1, "month"));
  const handleNextMonth = () => setSelectedDate(selectedDate.add(1, "month"));

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<View key={`empty-${i}`} className="w-10 h-10" />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const current = selectedDate.date(i);
      const isSelected = current.isSame(dayjs(selectedDate), "day");
      days.push(
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedDate(current)}
          className={`w-14 h-14 rounded-full items-center justify-center ${
            isSelected ? "bg-blue-100" : ""
          }`}
        >
          <CustomText
            className={`text-2xl ${
              isSelected ? "text-blue-600" : "text-black"
            }`}
          >
            {i}
          </CustomText>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View className="bg-gray-50 rounded-2xl p-4">
      {/* Header */}
      <View className="flex-row mb-4">
        <CustomText className="text-2xl" weight="bold">
          {selectedDate.format("MMMM YYYY")}
        </CustomText>
      </View>

      {/* Week days */}
      <View className="flex-row justify-between my-4">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <CustomText
            key={d}
            className="w-10 text-center text-[#3C3C434D]"
            weight="bold"
          >
            {d}
          </CustomText>
        ))}
      </View>

      {/* Days */}
      <View className="flex-row flex-wrap justify-between">{renderDays()}</View>

      {/* Time Picker */}

      <View className="flex-row items-center justify-between mt-5">
        <CustomText className="text-2xl">Time</CustomText>

        <View className="flex-row justify-center items-center mt-4 gap-x-4">
          <View className="bg-[#7676801F] px-4 py-2 rounded-lg">
            <CustomText className="text-2xl font-mono">
              {`${time.hour.toString().padStart(2, "0")}:${time.minute
                .toString()
                .padStart(2, "0")}`}
            </CustomText>
          </View>

          <View className="flex-row items-center gap-x-3 bg-[#7676801F] rounded-lg px-2 py-2">
            <TouchableOpacity
              className={`px-6 py-2 rounded-lg ${
                time.period === "AM" ? "bg-white" : ""
              }`}
              onPress={() => setTime({ ...time, period: "AM" })}
            >
              <CustomText>AM</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-6 py-2 rounded-lg ${
                time.period === "PM" ? "bg-white" : ""
              }`}
              onPress={() => setTime({ ...time, period: "PM" })}
            >
              <CustomText>PM</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CalendarPicker;
