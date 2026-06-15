import React, { useState, useEffect, useCallback } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Code2,
	Database,
	Shield,
	Palette,
	Film,
	Route,
	Map,
	Cloud,
} from 'lucide-react'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0a0f14;
    color: #F0ECE0;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
`

const float = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
`

const slideVariants = {
	enterRight: { opacity: 0, x: 80, scale: 0.97 },
	enterLeft: { opacity: 0, x: -80, scale: 0.97 },
	center: { opacity: 1, x: 0, scale: 1 },
	exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	background: #0a0f14;
`

const BackgroundOrbs = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 0;
`

const Orb = styled.div`
	position: absolute;
	border-radius: 50%;
	filter: blur(100px);
	opacity: 0.18;
	animation: ${float} ${props => props.duration || 25}s ease-in-out infinite;
	animation-delay: ${props => props.delay || 0}s;
	width: ${props => props.size || 400}px;
	height: ${props => props.size || 400}px;
	background: radial-gradient(
		circle,
		${props => props.color || '#D4AF37'},
		transparent
	);
	top: ${props => props.top || 50}%;
	left: ${props => props.left || 50}%;
`

const GridLines = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 0;
	background-image:
		linear-gradient(rgba(212, 175, 55, 0.06) 1px, transparent 1px),
		linear-gradient(90deg, rgba(212, 175, 55, 0.06) 1px, transparent 1px);
	background-size: 80px 80px;
`

const SlideContainer = styled.div`
	position: relative;
	z-index: 1;
	width: 92%;
	max-width: 1300px;
	height: 88vh;
	display: flex;
	align-items: center;
	justify-content: center;
`

const GlassCard = styled.div`
	background: rgba(25, 30, 40, 0.6);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 1px solid rgba(212, 175, 55, 0.25);
	padding: ${props => props.padding || '3rem'};
	box-shadow: 0 20px 60px rgba(212, 175, 55, 0.08);
	max-width: ${props => props.maxWidth || '900px'};
	width: 100%;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 30px;
		right: 30px;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(212, 175, 55, 0.5),
			transparent
		);
	}
`

const Title = styled.h1`
	font-family: 'Cormorant Garamond', serif;
	font-size: ${props => props.size || '3rem'};
	font-weight: 700;
	margin-bottom: ${props => props.mb || '1.5rem'};
	line-height: 1.2;
	color: #f5f0e8;

	span {
		background: linear-gradient(135deg, #e5c158, #f5d878);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
`

const Subtitle = styled.p`
	font-size: 1.1rem;
	color: #b0a890;
	line-height: 1.8;
	margin-bottom: ${props => props.mb || '1rem'};
	font-weight: 300;
`

const InfoLine = styled.div`
	font-size: 1rem;
	color: #b0a890;
	margin-bottom: 0.5rem;
	font-weight: 300;

	strong {
		color: #f5f0e8;
		font-weight: 500;
	}
`

const QRFrame = styled.div`
	display: inline-block;
	padding: 1.5rem;
	background: white;
	border: 1px solid rgba(212, 175, 55, 0.4);
	box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);

	img {
		width: 280px;
		height: 280px;
		display: block;
	}
`

const TechGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
	width: 100%;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`

const TechItem = styled(motion.div)`
	background: rgba(30, 35, 45, 0.7);
	border: 1px solid rgba(212, 175, 55, 0.2);
	padding: 1.8rem 1.5rem;
	text-align: center;
	transition: all 0.4s;

	&:hover {
		border-color: rgba(212, 175, 55, 0.5);
		background: rgba(40, 45, 55, 0.8);
		transform: translateY(-4px);
		box-shadow: 0 15px 40px rgba(212, 175, 55, 0.1);
	}
`

const TechIcon = styled.div`
	color: #e5c158;
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
	svg {
		width: 32px;
		height: 32px;
	}
`

const TechName = styled.div`
	font-family: 'Cormorant Garamond', serif;
	font-size: 1.2rem;
	font-weight: 600;
	color: #f5f0e8;
	margin-bottom: 0.3rem;
	letter-spacing: 0.03em;
`

const TechDesc = styled.div`
	font-size: 0.8rem;
	color: #8b8470;
	letter-spacing: 0.05em;
`

const ScreenshotGrid = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	gap: 2rem;
	align-items: start;
	width: 100%;
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`

const ScreenshotColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`

const ScreenshotFrame = styled.div`
	background: rgba(30, 35, 45, 0.4);
	border: 1px solid rgba(212, 175, 55, 0.25);
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	overflow: hidden;
	transition: all 0.4s;

	&:hover {
		border-color: rgba(212, 175, 55, 0.5);
		background: rgba(40, 45, 55, 0.6);
		box-shadow: 0 15px 40px rgba(212, 175, 55, 0.1);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		display: block;
	}

	&.pc {
		aspect-ratio: 16 / 10;
	}
	&.mobile {
		max-width: 300px;
		margin: 0 auto;
		border-radius: 20px;
		aspect-ratio: 9 / 19;
		img {
			object-fit: cover;
			object-position: top;
		}
	}
`

const ScreenshotLabel = styled.div`
	background: rgba(10, 15, 20, 0.9);
	backdrop-filter: blur(15px);
	padding: 0.5rem 1.5rem;
	font-size: 0.8rem;
	color: #e5c158;
	font-family: 'Cormorant Garamond', serif;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	border: 1px solid rgba(212, 175, 55, 0.3);
	text-align: center;
`

const NavDots = styled.div`
	position: fixed;
	right: 2.5rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	z-index: 10;
`

const Dot = styled.button`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	border: 1px solid
		${props => (props.active ? '#E5C158' : 'rgba(212, 175, 55, 0.4)')};
	background: ${props => (props.active ? '#E5C158' : 'transparent')};
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		border-color: #e5c158;
		transform: scale(1.4);
	}
`

const PageNumber = styled.div`
	position: fixed;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	font-size: 0.85rem;
	color: #e5c158;
	z-index: 10;
	font-family: 'Cormorant Garamond', serif;
	letter-spacing: 0.15em;
`

const Badge = styled.span`
	display: inline-block;
	color: #e5c158;
	font-size: 0.75rem;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	font-family: 'Cormorant Garamond', serif;
	border-bottom: 1px solid rgba(212, 175, 55, 0.4);
	padding-bottom: 0.3rem;
	margin-bottom: 0.5rem;
`

const List = styled.ul`
	text-align: left;
	list-style: none;
	margin-top: 1rem;
`

const ListItem = styled.li`
	color: #b0a890;
	padding: 0.7rem 0;
	padding-left: 2rem;
	position: relative;
	line-height: 1.6;
	font-weight: 300;
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 1rem;
		width: 6px;
		height: 1px;
		background: #e5c158;
	}
`

const techStack = [
	{ name: 'React 18', desc: 'Библиотека', icon: Code2 },
	{ name: 'Firebase', desc: 'Backend + БД', icon: Database },
	{ name: 'Firestore', desc: 'NoSQL база данных', icon: Database },
	{ name: 'Firebase Auth', desc: 'Аутентификация', icon: Shield },
	{ name: 'Styled Components', desc: 'CSS-in-JS', icon: Palette },
	{ name: 'Framer Motion', desc: 'Анимации', icon: Film },
	{ name: 'React Router v6', desc: 'Маршрутизация', icon: Route },
	{ name: 'Nominatim API', desc: 'Геокодинг', icon: Map },
	{ name: 'Amvera', desc: 'Деплой', icon: Cloud },
]

const TOTAL_SLIDES = 10

const App = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [direction, setDirection] = useState('right')

	const goToSlide = useCallback(
		index => {
			setDirection(index > currentSlide ? 'right' : 'left')
			setCurrentSlide(index)
		},
		[currentSlide],
	)

	const nextSlide = useCallback(() => {
		if (currentSlide < TOTAL_SLIDES - 1) {
			setDirection('right')
			setCurrentSlide(prev => prev + 1)
		}
	}, [currentSlide])

	const prevSlide = useCallback(() => {
		if (currentSlide > 0) {
			setDirection('left')
			setCurrentSlide(prev => prev - 1)
		}
	}, [currentSlide])

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide()
			if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [nextSlide, prevSlide])

	const slides = [
		<GlassCard maxWidth='850px' padding='4rem'>
			<Badge>Дипломный проект</Badge>
			<Title
				size='3.5rem'
				style={{ marginBottom: '0.5rem', marginTop: '1.5rem' }}
			>
				Разработка веб-приложения
				<br />
				<span>ClearBreath</span>
			</Title>
			<Subtitle
				style={{ fontSize: '1rem', marginTop: '1rem', color: '#8B8470' }}
			>
				Клининговая платформа нового поколения
			</Subtitle>
			<div style={{ marginTop: '3rem' }}>
				<InfoLine>
					Выполнил: <strong>Зубов Владимир Владимирович ИСП-05</strong>
				</InfoLine>
				<InfoLine>
					Руководитель: <strong>Сметанин Андрей Евгеньевич</strong>
				</InfoLine>
				<InfoLine
					style={{
						marginTop: '2rem',
						fontSize: '1.1rem',
						color: '#E5C158',
						fontFamily: '"Cormorant Garamond", serif',
						letterSpacing: '0.1em',
					}}
				>
					Новгородский Строительный Колледж
				</InfoLine>
				<InfoLine style={{ marginTop: '1rem' }}>2026</InfoLine>
			</div>
		</GlassCard>,

		<GlassCard maxWidth='850px'>
			<Badge>Актуальность</Badge>
			<Title size='2.5rem' style={{ marginTop: '0.5rem' }}>
				Почему это <span>важно?</span>
			</Title>
			<Subtitle style={{ marginTop: '1.5rem', textAlign: 'left' }}>
				Современный рынок клининговых услуг активно растёт. В 2026 году объём
				рынка клининга в России превысил 250 млрд рублей. При этом большинство
				компаний до сих пор используют устаревшие методы приёма заказов.
			</Subtitle>
			<Subtitle style={{ textAlign: 'left', marginTop: '1rem' }}>
				Автоматизация процессов позволяет сократить время обработки заказа на
				70%, уменьшить количество ошибок и повысить удовлетворённость клиентов.
				ClearBreath решает эти задачи.
			</Subtitle>
		</GlassCard>,

		<GlassCard maxWidth='850px'>
			<Badge>Цель и задачи</Badge>
			<Title size='2.2rem' style={{ marginTop: '0.5rem' }}>
				<span>Цель</span> работы
			</Title>
			<Subtitle style={{ marginTop: '1rem' }}>
				Разработка полнофункционального веб-приложения для клининговой компании,
				обеспечивающего автоматизацию процессов заказа услуг, управления
				заказами и взаимодействия с клиентами.
			</Subtitle>
			<Title
				size='1.6rem'
				style={{ marginTop: '2.5rem', marginBottom: '1rem' }}
			>
				<span>Задачи</span>
			</Title>
			<List>
				<ListItem>
					Спроектировать архитектуру веб-приложения и структуру базы данных
				</ListItem>
				<ListItem>
					Реализовать клиентскую часть с адаптивным UI/UX дизайном
				</ListItem>
				<ListItem>
					Разработать административную панель для управления услугами и заказами
				</ListItem>
				<ListItem>
					Внедрить систему авторизации, онлайн-калькулятор и интеграцию с
					геокодингом
				</ListItem>
			</List>
		</GlassCard>,

		<GlassCard maxWidth='900px'>
			<Badge>Технологии</Badge>
			<Title
				size='2.5rem'
				style={{ marginTop: '0.5rem', marginBottom: '2rem' }}
			>
				Стек <span>технологий</span>
			</Title>
			<TechGrid>
				{techStack.map((tech, i) => (
					<TechItem
						key={tech.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
					>
						<TechIcon>
							<tech.icon />
						</TechIcon>
						<TechName>{tech.name}</TechName>
						<TechDesc>{tech.desc}</TechDesc>
					</TechItem>
				))}
			</TechGrid>
		</GlassCard>,

		<GlassCard maxWidth='600px'>
			<Badge>QR-код</Badge>
			<Title size='2rem' mb='2rem' style={{ marginTop: '0.5rem' }}>
				Ссылка на сайт
			</Title>
			<QRFrame>
				<img src='/qrra.png' alt='QR код' />
			</QRFrame>
			<Subtitle
				style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#8B8470' }}
			>
				Отсканируйте чтобы открыть веб-приложение
			</Subtitle>
		</GlassCard>,

		<div style={{ width: '100%', maxWidth: '1300px' }}>
			<Badge style={{ marginLeft: '2rem' }}>Главная страница</Badge>
			<Title
				size='1.8rem'
				style={{
					marginLeft: '2rem',
					marginTop: '0.3rem',
					marginBottom: '1.5rem',
				}}
			>
				Скриншоты
			</Title>
			<ScreenshotGrid>
				<ScreenshotColumn>
					<ScreenshotFrame className='pc'>
						<img src='/gl.PNG' alt='ПК версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>ПК версия</ScreenshotLabel>
				</ScreenshotColumn>
				<ScreenshotColumn>
					<ScreenshotFrame className='mobile'>
						<img src='/mbgl.PNG' alt='Мобильная версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>Мобильная версия</ScreenshotLabel>
				</ScreenshotColumn>
			</ScreenshotGrid>
		</div>,

		<div style={{ width: '100%', maxWidth: '1300px' }}>
			<Badge style={{ marginLeft: '2rem' }}>Страница услуг</Badge>
			<Title
				size='1.8rem'
				style={{
					marginLeft: '2rem',
					marginTop: '0.3rem',
					marginBottom: '1.5rem',
				}}
			>
				Скриншоты
			</Title>
			<ScreenshotGrid>
				<ScreenshotColumn>
					<ScreenshotFrame className='pc'>
						<img src='/us.PNG' alt='ПК версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>ПК версия</ScreenshotLabel>
				</ScreenshotColumn>
				<ScreenshotColumn>
					<ScreenshotFrame className='mobile'>
						<img src='/usmb.PNG' alt='Мобильная версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>Мобильная версия</ScreenshotLabel>
				</ScreenshotColumn>
			</ScreenshotGrid>
		</div>,

		<div style={{ width: '100%', maxWidth: '1300px' }}>
			<Badge style={{ marginLeft: '2rem' }}>Личный кабинет</Badge>
			<Title
				size='1.8rem'
				style={{
					marginLeft: '2rem',
					marginTop: '0.3rem',
					marginBottom: '1.5rem',
				}}
			>
				Скриншоты
			</Title>
			<ScreenshotGrid>
				<ScreenshotColumn>
					<ScreenshotFrame className='pc'>
						<img src='/lk.PNG' alt='ПК версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>ПК версия</ScreenshotLabel>
				</ScreenshotColumn>
				<ScreenshotColumn>
					<ScreenshotFrame className='mobile'>
						<img src='/lkmb.PNG' alt='Мобильная версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>Мобильная версия</ScreenshotLabel>
				</ScreenshotColumn>
			</ScreenshotGrid>
		</div>,

		<div style={{ width: '100%', maxWidth: '1300px' }}>
			<Badge style={{ marginLeft: '2rem' }}>Админ панель</Badge>
			<Title
				size='1.8rem'
				style={{
					marginLeft: '2rem',
					marginTop: '0.3rem',
					marginBottom: '1.5rem',
				}}
			>
				Скриншоты
			</Title>
			<ScreenshotGrid>
				<ScreenshotColumn>
					<ScreenshotFrame className='pc'>
						<img src='/ad.PNG' alt='ПК версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>ПК версия</ScreenshotLabel>
				</ScreenshotColumn>
				<ScreenshotColumn>
					<ScreenshotFrame className='mobile'>
						<img src='/admb.PNG' alt='Мобильная версия' />
					</ScreenshotFrame>
					<ScreenshotLabel>Мобильная версия</ScreenshotLabel>
				</ScreenshotColumn>
			</ScreenshotGrid>
		</div>,

		<GlassCard maxWidth='850px' padding='3rem'>
			<Badge>Заключение</Badge>
			<Title
				size='2.2rem'
				style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}
			>
				<span>Итоги</span> работы
			</Title>
			<Subtitle style={{ textAlign: 'left', fontSize: '1rem' }}>
				В ходе дипломного проекта все поставленные задачи были выполнены в
				полном объёме:
			</Subtitle>
			<List>
				<ListItem>
					Спроектирована архитектура веб-приложения и структура базы данных на
					Firebase
				</ListItem>
				<ListItem>
					Реализована клиентская часть с адаптивным дизайном в стиле Liquid
					Glass
				</ListItem>
				<ListItem>
					Разработана административная панель с управлением услугами, заказами и
					отзывами
				</ListItem>
				<ListItem>
					Внедрена система авторизации, онлайн-калькулятор и интеграция с
					геокодингом
				</ListItem>
			</List>
			<Subtitle
				style={{ marginTop: '1.5rem', textAlign: 'left', fontSize: '1rem' }}
			>
				Цель работы достигнута — создано полнофункциональное веб-приложение
				ClearBreath, готовое к внедрению в деятельность клининговой компании.
				Приложение обеспечивает автоматизацию ключевых бизнес-процессов и
				улучшает взаимодействие с клиентами.
			</Subtitle>
			<Subtitle
				style={{
					marginTop: '1.5rem',
					textAlign: 'center',
					color: '#E5C158',
					fontFamily: '"Cormorant Garamond", serif',
					fontSize: '1.1rem',
				}}
			>
				Спасибо за внимание!
			</Subtitle>
		</GlassCard>,
	]

	return (
		<>
			<GlobalStyles />
			<Container>
				<BackgroundOrbs>
					<Orb
						size={500}
						color='#D4AF37'
						top='15%'
						left='5%'
						duration={30}
						delay={0}
					/>
					<Orb
						size={350}
						color='#E5C158'
						top='55%'
						left='85%'
						duration={25}
						delay={8}
					/>
					<Orb
						size={300}
						color='#C8A43A'
						top='75%'
						left='30%'
						duration={28}
						delay={15}
					/>
					<Orb
						size={400}
						color='#D4AF37'
						top='8%'
						left='75%'
						duration={32}
						delay={5}
					/>
				</BackgroundOrbs>
				<GridLines />

				<SlideContainer>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentSlide}
							variants={slideVariants}
							initial={direction === 'right' ? 'enterRight' : 'enterLeft'}
							animate='center'
							exit='exit'
							transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{slides[currentSlide]}
						</motion.div>
					</AnimatePresence>
				</SlideContainer>

				<NavDots>
					{slides.map((_, i) => (
						<Dot
							key={i}
							active={i === currentSlide}
							onClick={() => goToSlide(i)}
						/>
					))}
				</NavDots>

				<PageNumber>
					{currentSlide + 1} / {TOTAL_SLIDES}
				</PageNumber>
			</Container>
		</>
	)
}

export default App
