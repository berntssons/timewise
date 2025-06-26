import { useState } from "react";
import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import notifications from "@/utils/notifications";

import Button from '@/app/components/Button';
import CreateNotification from "@/app/components/CreateNotification";

notifications.init();

export default function Index() {
  const [currentNotifications, setCurrentNotifications] = useState<{ [id: string]: string }>({});

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        gap: 20,
        padding: 20,
      }}>
        <CreateNotification onCreated={(id, title) => setCurrentNotifications(prev => ({ ...prev, [id]: title }))} />
        <Button onPress={() => notifications.cancelAll(() => setCurrentNotifications({}))} >Cancel all</Button>
        {Object.entries(currentNotifications)?.map(([id, title]) => 
          <Button 
            key={id}
            onPress={() => notifications.cancel(id, () => setCurrentNotifications(({[id]: toBeDeleted, ...rest}) => rest))} 
          >Cancel {title}</Button>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
