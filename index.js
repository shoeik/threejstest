// 参考
// https://www.iegao.co.jp/


// window.addEventListener("DOMContentLoaded", init);

// function init() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	
	// const renderer = new THREE.WebGLRenderer({
	// 	canvas: document.querySelector("#myCanvas")
	// });
	const renderer = new THREE.WebGLRenderer({ 
		// canvas: canvasElement,
		antialias: true,
		alpha: true
	});

	document.getElementById('container').appendChild(renderer.domElement);

	renderer.setClearColor(new THREE.Color(0x111111));
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);
	
	const scene = new THREE.Scene();
	
	
	const fov = 60;
	const fovRad = (Math.PI / 180 )* (fov / 2);
	
	dist = (height / 2) / Math.tan(fovRad);
	
	const camera = new THREE.PerspectiveCamera(fov, width / height, 1, dist * 2);
	camera.position.z = dist;






	//
	// 宇宙
	//

	function univers() {

		const vertices = [];
		const colors = [];
	
		const size = width;
	
		const length = 1500;
	
		// const geometry = new THREE.Geomery();
	
		const geometry = new THREE.BufferGeometry();
	
	
		for (let i = 0; i < length; i++) {
			const a = size * (Math.random() - 0.5);
			const b = size * (Math.random() - 0.5);
			const c = size * (Math.random() - 0.5);
	
			vertices.push(a, b, c);
	
			const h = Math.random() * 0.2;
			const s = 0.2 + Math.random() * 0.2;
			const v = 0.8 + Math.random() * 0.2;
			colors.push(h, s, v);
	
		}
		
	
		// vertices配列から 3つずつ取り出して座標に適応する という意味　1つの頂点座標が3次元だから
	
		// 配列　6つなら　2つできる
		// 2 なら 2つずつで x, y座標しか適応されない　zは0   パーティクル　3つになる
		// 1 なら 1つずつで x座標しか適応されない y, z は　0 　パーティクル　6つになる
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	
	
		const createTexture = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			let grad = null;
			let texture = null;
	
			canvas.width = 100;
			canvas.height= 100;
			grad = ctx.createRadialGradient(50, 50, 0, 50, 50, 50);
			// grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
			// grad.addColorStop(0.1, 'rgba(255, 255, 255, 0.8)');
			// grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.2)');
			// grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
			grad.addColorStop(0.0, 'rgba(0, 150, 200, 0.5)');
			grad.addColorStop(0.1, 'rgba(0, 150, 220, 0.3)');
			grad.addColorStop(0.15, 'rgba(0, 150, 235, 0.2)');
			grad.addColorStop(1.0, 'rgba(0, 150, 255, 0)');
			ctx.fillStyle = grad;
			ctx.arc(50, 50, 50, 0, Math.PI / 180, true);
			ctx.fill();
	
			texture = new THREE.Texture(canvas);
			texture.minFilter = THREE.NearestFillter;
			texture.needsUpdate = true;
			// console.log(texture)
			return texture;
		};
	
		const texture = createTexture();
	
		
	
	
		const material = new THREE.PointsMaterial({
			// color: 0x0044aa,
			size: 10,
			transparent: true,
			depthWrite: false,
			blendeing: THREE.AdditiveBlending,
			map: createTexture(),
		});
	
		const BGmesh = new THREE.Points(geometry, material);
		scene.add(BGmesh);
	}
	// BGmesh
	univers();










	// const image = new Image();



	// image.src = './images/logo.png';
	// image.src = './images/OBDKVJ1.png';
	// image.src = './images/sample-01.png';
	// image.src = './images/smartphone.png';
	// image.src = './images/21st_Century_Museum_of_Contemporary_Art,_Kanazawa011.jpeg';

	// image2.src = './images/logo.png';
	// image2.src = './images/OBDKVJ1.png';
	// image2.src = './images/desktop.png';
	// image2.src = './images/smartphone.png';
	// image2.src = './images/sample-01.png';
	// 'https://hisamikurita.github.io/sample-images/dist/assets/images/logo.png';
	// './images/sample-01.png',
	// "https://images.unsplash.com/photo-1670827631257-0736525f18c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

	// image.src = 'https://hisamikurita.github.io/sample-images/dist/assets/images/logo.png';


	// image3.src = './images/controller.png';
	// image3.src = './images/OBDKVJ1.png';



	let pointPosition = [];


	
	
	// image.addEventListener('load', () => {
		
	const geometry = new THREE.BufferGeometry();





	///////////////////////
	// あのサイトのやり方
	///////////////////////


	// const NUM_VERTICES = 128 * 128; // パーティクルの数
	const NUM_VERTICES = 250000 / 4; // パーティクルの数

	const vertices = []; // パーティクルの頂点座標を格納する配列
	const randomValues = []; // パーティクルごとのランダムな値を格納する配列

	// 一定の範囲内でランダムな位置にパーティクルを配置する

	// posのやつで少ない方のやつに合わせたらいけるみたいやぞ　なんでか知らんけど
	// for (let i = 0; i < 4932 / 3; i++) {
	for (let i = 0; i < 10362 / 3; i++) {
		// ランダムな半径と角度を生成
		// const randomRBaseValue = Math.max(window.innerWidth, mainStore.glHeight);
		const randomRBaseValue = 500;
		const randomR = (0.4 + 0.6 * randomRBaseValue) * Math.sqrt(Math.random());
		const randomAngle = Math.PI * 2 * Math.random();
		
		// 極座標から直交座標に変換して頂点を追加
		const x = Math.cos(randomAngle) * randomR;
		const y = Math.sin(randomAngle) * randomR;
		vertices.push(x, y, 0);

		// パーティクルごとのランダムな値を追加
		randomValues.push(
			getRandomValue() * 2 - 1,
			getRandomValue() * 2 - 1,
			getRandomValue() * 2 - 1,
			getRandomValue() * 2 - 1
		);
	}

	// パーティクルの配置が完了したら、vertices 配列と randomValues 配列を使用して何かを行う


	function getRandomValue() {
		return (Math.random() + Math.random() + Math.random()) / 3;
	}

	console.log(vertices);


	geometry.setAttribute('position' , new THREE.BufferAttribute(new Float32Array(vertices), 3));

	///////////////////////




	function positionning(image) {



		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		// const width = image.width;
		// const height = image.height;
		canvas.width = image.width;
		canvas.height = image.height;


		ctx.drawImage(image, 0, 0);
		const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
		let position = [];
		let color = [];
		let alpha = [];

		const ratio = 10.0;

		// widthとheightの範囲内でrandamな座標を取得する




		
		// for (let i = 0; i < array.length; i++) {
		// 	const element = array[i];
			
		// }


		
		// for (let x= 0; x < image.width; x += ratio) {
		// 	for (let y = 0; y < image.height ; y += ratio) {
	

		// 		const index = (y * image.width + x) * 4;


		// 		// const r = imageData[index] / 255;
		// 		// const g = imageData[index + 1] / 255;
		// 		// const b = imageData[index + 2] / 255;
		// 		const a = imageData[index + 3] / 255;


		// 		const pX = x - image.width / 2;
		// 		const pY = -(y - image.height / 2);
		// 		// const pZ = 0;
				
		// 		if (a !== 0) {

		// 			// あのサイトでのやる時のやり方
		// 			// position.push([pX, pY]);

		// 			position.push([pX, pY]);


		// 			// color.push(r, g, b);

		// 			// そもそもalpha0のものは描画しないからいらない
		// 			// alpha.push(a);
		// 		}
		// 	}
			
		// }

			// console.log(imageData.length / 4)
			
			for (let i = 0; i < imageData.length / 4; i+= 10) {
				// console.log(image.src)
				const a = imageData[i * 4 + 3];
				// let pX = i % 500 - 250;
				// let pY = -(Math.floor(i / 500) - 250);

				let pX = i % 1024 - 512;
				let pY = -(Math.floor(i / 1024) - 512);

				
				if (a !== 0) {
					position.push([pX, pY]);
					// console.log(pX, pY)
				} else {
					// position.push([0, 0]);
					// console.log(a)

					// console.log(position[i])
				}
			}
			



		//
		// // あのサイトでのやり方
		//
		// function shuffle(arr) {
		// 	const _arr = arr.slice();
		// 	for(let i = _arr.length - 1; i > 0; i--){
		// 	  	let r = Math.floor(Math.random() * (i + 1));
		// 		let tmp = _arr[i];
		// 		_arr[i] = _arr[r];
		// 		_arr[r] = tmp;
		// 	}
		// 	return _arr;
		// }

		// const _position = shuffle(position);
		// // console.log(_position);

		// position = _position.slice();






		// // positionの配列の一つずつに0を2つ追加していく		
		// for (let i = 0; i < position.length; i++) {
		// 	position[i].push(0, 0);
		// }

		// pointData = position.slice();

		// // imageList.push({position, color, alpha});
		// imageList.push({position, alpha});

		// imageList.push(pointData);

		// console.log(imageList[0]);



		// positionの配列の一つずつに0を1つ追加していく		
		// for (let i = 0; i < position.length; i++) {
		// 	position[i].push(0);
		// }

		// let _position = position;


		

		// gpt4の提案　　gpt3によると効率が悪いらしい
		// position.sort(() => Math.random() - 0.5);

		
		// GPT3のやり方
		//　あのサイトとほぼ同じ
		// Fisher-Yatesアルゴリズム
		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
				// const temp = array[i];
				// array[i] = array[j];
				// array[j] = temp;
			}
			return array;
		}
		
		// console.log(position[0])

		position = shuffleArray(position)




		
		// console.log(_position);
		
		

		

		position = position.map(array => [
			array[0] + ratio + Math.floor(Math.random() * ratio),
			array[1] + ratio + Math.floor(Math.random() * ratio)
		]);




		// positionの配列の一つずつに0を 追加していく		
		for (let i = 0; i < position.length; i++) {


			position[i].push(0);



			// if (position[i][0] === 0 && position[i][1] === 0) {
			// 	position[i].push(100);
			// 	console.log([i])

			// } else {
			// 	position[i].push(0);
			// }

		}





		//
		// const array = [[1, 2], [3, 4], [5, 6]];
		// // 2次元配列をフラット化して1次元配列に変換

		// 膨大な配列を一気に展開しようとしてたからオーバーフローしてた
		// position = [].concat(...position);


		let _position = [];
		for (let i = 0; i < position.length; i++) {
			_position = _position.concat(position[i]);
		}

		position = _position;

		// imageList.push({position, alpha});




		return position;

	};


	



		
	const imageList = [
		// './images/logo.png'
		// './images/sample-01.png'

		// './images/imac.png'
		'./images/pc_ver3.png'
		,'./images/webdesign_ver1.png'
		// ,'./images/smartphone.png'
		// ,'./images/smartphone_l.png'
		,'./images/iot.png'
		// ,'./images/brain.png'
		// './images/chain_s.png'
		// ,'./images/iot_s.png'

	];


	// 
	// copilot ででたやつをGPT4にリファクタリングしてもらったやり方　
	// ＊＊＊関数名とか変えてない
	// 


	// Function to load an image and return a Promise
	function loadImage(url) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = () => reject(new Error(`Failed to load image at ${url}`));
			image.src = url;
		});
	}

	// Async function to load images and log their details
	async function loadAndLogImageDetails(urls) {
		for (const url of urls) {
			try {
				const image = await loadImage(url);
				console.log('Image loaded:', url);	
				console.log('Image width:', image.width);
				console.log('Image height:', image.height);


				// 画像がロードされたら、
				pointPosition.push(positionning(image));
				console.log(pointPosition)

				createGeo(pointPosition);

				
			} catch (error) {
				console.error(error);
			}
		}
	}

	// Load and log details of all images
	loadAndLogImageDetails(imageList);




	// 
	/////////
	// 


	function createGeo(pointPosition) {	
		// console.log(pointPosition)

		for (let i = 0; i < pointPosition.length; i++) {

			// console.log(pointPosition[i]);


			const test = 'pos'+i
			geometry.setAttribute(test , new THREE.BufferAttribute(new Float32Array(pointPosition[i]), 3));
			
			console.log('pos'+i);
		}

		createMesh()
		
	}


	function createMesh() {
		// textureの設定
	
		const pointTexture = new THREE.TextureLoader().load('./images/point.png');
	
		// ただのマテリアル
		const material = new THREE.RawShaderMaterial({
			vertexShader: document.getElementById('vertex-shader').textContent,
			fragmentShader: document.getElementById('fragment-shader').textContent,
			uniforms: {
				u_ratio: { type: 'f', value: 0.0 },
				u_time: { type: 'f', value: 0.0 },
	
				test1: { type: "f", value: 0.0 },
				test2: { type: "f", value: 0.0 },
				test3: { type: "f", value: 0.0 },

				// u_sec1: { type: "f", value: 0.0 },
				// u_sec2: { type: "f", value: 0.0 },
				// u_sec3: { type: "f", value: 0.0 },
				// u_sec4: { type: "f", value: 0.0 },
	
				pointTexture: { value: pointTexture }

				,test: { value: 0.0 }
			},
			transparent: true,
		});
	
		const imgMesh = new THREE.Points(geometry, material);
			
		scene.add(imgMesh);	





		// gsap.to(imgMesh.material.uniforms.test, {
		// 	value: 1.0
		// 	,duration: 5
		// 	, delay: 2
		// });

		gsap.to(imgMesh.material.uniforms.test1, {
			value: 1.0,
			scrollTrigger: {
				trigger: ".s-1",
				start: "bottom bottom-=33.333%",
				end: "bottom top",
				scrub: 0.7
			}
		});
		gsap.to(imgMesh.material.uniforms.test2, {
			value: 1.0,
			scrollTrigger: {
				trigger: ".s-2",
				start: "bottom bottom-=33.333%",
				end: "bottom top",
				scrub: 0.7
			}
		});
		// gsap.to(imgMesh.material.uniforms.test3, {
		// 	value: 1.0,
		// 	scrollTrigger: {
		// 		trigger: ".s-3",
		// 		start: "bottom bottom",
		// 		end: "bottom top",
		// 		scrub: 0.7
		// 	}
		// });
		// gsap.to(imgMesh.material.uniforms.test4, {
		// 	value: 1.0,
		// 	scrollTrigger: {
		// 	trigger: ".s-4",
		// 	start: "bottom bottom",
		// 	end: "bottom top",
		// 	scrub: 0.7
		// 	}
		// });

		
	}
	








		// geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pointPosition[0]), 3));
		// geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(imageList[0].color), 3));
		// geometry.setAttribute('alpha', new THREE.BufferAttribute(new Float32Array(imageList[0].alpha), 1));

		// geometry.setAttribute('position2', new THREE.BufferAttribute(new Float32Array(imageList[1].position), 3));


		// const rand = [];
		// const vertces = imageList[0].position.length / 3;
		// for (let i = 0; i < vertces; i++) {
		// 	rand.push((Math.random() - 1.0) * 2.0, (Math.random() - 1.0) * 2.0);
		// }
		// geometry.setAttribute('rand', new THREE.BufferAttribute(new Float32Array(rand), 2));








	// });



    const animation = () => {

        // 絶対値　何回呼び出されようが　時間が変わらないと戻り値は変わらない
        let sec = performance.now() / 1000;
        
        // material.uniforms.uTime.value = sec * 50;
        // material.uniforms.uTime.value += 1;
        // console.log(sec, material.uniforms.uTime.value)
        


        let ran = 0.1;
        if ((sec / 10)==0) {
            ran = Math.random();
        }
    
        // mesh.position.z = sec * .5;
        // mesh.position.x = sec * -.5;
        // BGmesh.rotation.y = sec * 0.0001 + (ran - 0.5);
        // BGmesh.rotation.z = sec * 0.00001 + (ran - 0.5);



		// 奥から手前に動く
		// BGmesh.position.z = sec * 10;
        // BGmesh.position.y = sec * -.5;


		

        renderer.render(scene, camera);
        
        requestAnimationFrame(animation);
        
        
        
        // mesh.rotation.y = sec * Math.PI / 180 * 90;
        
    }
    animation();



    // window.addEventListener('load', () => {
    //     loop();
    // });




    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

		// mesh.scale.set(pWidth,pHeight,1);
        // uniforms.uResolution.value =  [canvas.width, canvas.height]
        // uniforms.uCirclePos.value =  circlePos;


		renderer.render(scene, camera);
    });
    
    // function onResize() {
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;

    //     renderer.setPixelRatio(window.devicePixelRatio);
    //     renderer.setSize(width, height);

    //     camera.aspect = width / height;
    //     camera.updateProjectionMatrix();
    // }


// }

