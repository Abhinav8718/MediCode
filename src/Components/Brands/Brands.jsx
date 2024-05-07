
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BrandsData } from './BrandsData';

const Brands = () => {
  return (
    <Box maxW="95%" mx="auto" pt={60}>
      <Heading fontSize="26px" textAlign="left">
        Featured Brands
      </Heading>
      <Text fontSize="lg" color="gray.600" mt={5}>
        Pick from our favourite brands
      </Text>
      <Stack direction="row" gap={30} justify="space-between" overflowX="scroll" mt={25}>
        {BrandsData.map((brand, i) => (
          <Box key={i} w="180px" h="212px">
            <img
              src={brand.img}
              alt=""
              borderRadius="5px"
              w="180px"
              h="172px"
              cursor="pointer"
            />
            <Box w="180px">
              <Text fontSize="lg" fontWeight="500">
                {brand.heading}
              </Text>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Brands;