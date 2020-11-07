import React from 'react'
import Image from 'next/image'
import { Box, Flex, Text } from 'theme-ui'
import BBBox from '../shared/BBBox'

const studyTimeMs = 1582992000000

function getDistanceTime () {
  const nowMs = Date.now()
  const distanceDate = new Date(nowMs - studyTimeMs)
  const year = distanceDate.getFullYear() - 1970
  const month = distanceDate.getMonth() + 1
  return `${year === 0 ? '' : year + '年 '}${month}个月`
}

const Banner: React.VFC = () => {
  return (
    <BBBox>
      <Box sx={{ position: 'relative', height: ['32rem', '43rem'] }}>
        
        {/* 背景图 */}
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -1,
        }}>
          <Image className='banner' src='/images/home-banner.jpg' layout='fill' priority={true} alt='banner'/>
        </Box>

        {/* 介绍 */}
        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-end', p: '16', color: '#fff' }}>
          <Text className='text'  sx={{ textShadow: 'homeBannerText', fontSize: 'sm', letterSpacing: '.1em' }}>很高兴遇见你</Text>
          <Text className='text' sx={{ fontSize: ['2xl', '5xl'] }}>嗨✋ 你可以叫我 Jeff</Text>
          <Text className='text' sx={{ fontSize: ['2xl', '5xl'] }}>前端开发者💻</Text>
          <Text className='text' sx={{ fontSize: 'sm', letterSpacing: '.1em', mt: '8' }}>使用框架⚙</Text>
          <Text className='text' sx={{ fontSize: ['xl', '3xl'] }}>React</Text>
          <Text className='text' sx={{ fontSize: ['xl', '3xl'] }}>Vue</Text>
          <Text className='text' sx={{ fontSize: ['xl', '3xl'] }}>Express</Text>
          <Text className='text' sx={{ fontSize: 'sm', letterSpacing: '.1em', mt: '8' }}>发展方向🎯</Text>
          <Text className='text' sx={{ fontSize: ['lg', '2xl'] }}>全栈工程师</Text>
          <Text className='text' sx={{ fontSize: 'sm', letterSpacing: '.1em', mt: '8' }}>
            接触前端至今{getDistanceTime()}📈
          </Text>
        </Flex>

      </Box>
      <style global jsx>{`
        .banner {
          object-fit: cover;
        }
        .text {
          text-shadow: 1px 1px 2px #736598;
        }
      `}</style>
    </BBBox>
  )
}

export default Banner
