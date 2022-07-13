import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Item from './Item';
import NavBar from './NavBar';
import {DIMENSIONS} from '../Styles/Dimensions';

export default function ListItem() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState();
  const [count, setCount] = useState(5);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    if (list.length === 0) {
      setLoading(true);
      const res = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=1',
      );
      const data = await res.data;
      const arr = await data.results;
      const _list = [];
      for (let index = 1; index <= arr.length - 16; index++) {
        const newItem = await {};
        newItem['id'] = await index;
        newItem['image'] =
          (await 'https://image.tmdb.org/t/p/w500/') + arr[index].poster_path;
        _list.push(newItem);
      }
      if (_list.length === arr.length - 16) {
        setList(_list);
        setLoading(false);
      }
    }
  };

  const getMoreItem = async () => {
    if (list.length === 16) {
      return;
    } else {
      await setLoading(true);
      const res = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=1',
      );
      const data = await res.data;
      const arr = await data.results;
      const _list = [];
      for (let index = count; index <= count + 3; index++) {
        const newItem = await {};
        newItem['id'] = await index;
        newItem['image'] =
          (await 'https://image.tmdb.org/t/p/w500/') + arr[index].poster_path;
        _list.push(newItem);
      }
      if (_list.length === 4) {
        setList([...list, ..._list]);
        setCount(count => count + 4);
        setLoading(false);
      }
    }
  };

  const handleRefeshItem = async () => {
    setLoading(true);
    const res = await axios.get(
      'https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=1',
    );
    const data = await res.data;
    const arr = await data.results;
    const _list = [];
    for (let index = 1; index <= arr.length - 16; index++) {
      const newItem = await {};
      newItem['id'] = await index;
      newItem['image'] =
        (await 'https://image.tmdb.org/t/p/w500/') + arr[index].poster_path;
      _list.push(newItem);
    }
    setList(_list);
    setCount(5);
    setLoading(false);
  };

  const renderItem = ({item}) => <Item image={item.image} />;

  return (
    <View style={listItemStyles.container}>
      <NavBar />
      <Text style={listItemStyles.title}>Popular list</Text>
      {list.length !== 0 && (
        <FlatList
          data={list}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={handleRefeshItem}
          keyExtractor={item => item.id}
          numColumns={2}
          style={{
            marginTop: DIMENSIONS.screenWidth / 30,
            paddingLeft: DIMENSIONS.screenWidth / 45,
          }}
          ListFooterComponent={() =>
            list.length < 16 && (
              <TouchableOpacity
                style={listItemStyles.loadMoreButton}
                onPress={() => getMoreItem()}>
                <Text style={listItemStyles.loadMoreText}>Load more</Text>
              </TouchableOpacity>
            )
          }
        />
      )}
    </View>
  );
}

const listItemStyles = StyleSheet.create({
  container: {
    height: DIMENSIONS.screenHeight - 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: DIMENSIONS.screenWidth / 20,
    marginTop: DIMENSIONS.screenWidth / 30,
  },
  loadMoreButton: {
    alignSelf: 'center',
    backgroundColor: '#21A9E9',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  loadMoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
