import { FlatList, Modal } from 'react-native';

import { Product } from '../../types/Product';
import { Image, CloseButton, ModalBody, Header, IngredientsContainer, Ingredient} from './styles';
import { Close } from '../Icons/Close';

import { Text } from '../Text';


interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: null | Product
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
    if (!product) {
        return null;
    }

    console.log(product);
    return (
        <Modal
            visible={visible}
            animationType='slide'
            presentationStyle='pageSheet' // apenas para iphone
            onRequestClose={onClose}
        >
            <Image
                source={{
                    uri: `http://192.168.0.110:3001/uploads/${product?.imagePath}`
                }}
            >
                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>

            <ModalBody>
                <Header>
                    <Text size={24} weight='600'>{product.name}</Text>
                    <Text color='#666' style={{ marginTop: 8}}>{product.description}</Text>
                </Header>

                <IngredientsContainer>
                    <Text weight='600' color='#666'>Igredientes</Text>

                    <FlatList 
                        data={product.ingredients}
                        keyExtractor={ingredient => ingredient._id}
                        style={{ marginTop: 16}}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item: ingredient }) => (
                            <Ingredient>
                                <Text>{ingredient.icon}</Text>
                                <Text size={14} color='#666' style={{marginLeft: 20}}>
                                    {ingredient.name}
                                    </Text>
                            </Ingredient>
                        )}
                    />
                </IngredientsContainer>
            </ModalBody>



        </Modal>
    );
}