import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('')

  //handle é usado quando uma função é disparado por uma ação do usuario
  function handleAddNewSkill() {
    if(!newSkill.trim()) return

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    // aqui adiciono o stado que estava antes com o novo, por isso o uso do spreed
    setMySkills(oldState => {
      // Isso garante que a ordenação seja feita com base no valor da propriedade name de cada objeto.
      const updatedSkills = [...oldState, data].sort((a, b) => a.name.localeCompare(b.name))
      return updatedSkills
    });
    // setMySkills(oldState => [...oldState, data]);
    setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      setGreeting('Good Morning!')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon!');
    } else {
      setGreeting('Good Night!')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Márcio</Text>

      <Text style={styles.greetings}>
        {greeting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
        value={newSkill}
      // onFocus={true}
      />

      <Button
        title="Add"
        onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SkillCard 
          skill={item.name}
          onPress={() => handleRemoveSkill(item.id)}/>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#FFF',
    fontSize: 18,
    padding: 15,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#FFF'
  }
})