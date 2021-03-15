import React from 'react';

const FavoritListContext = React.createContext([]);

export const FavListProvider = FavoritListContext.Provider;
export const FavListConsumer = FavoritListContext.Consumer;

export default FavoritListContext;

