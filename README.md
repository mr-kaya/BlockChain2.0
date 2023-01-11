# BlockChain2.0
# Program nasıl çalıştırılır.
- Kodu çalıştırmak için ilk olarak. İndirilen kodun bulunduğu ana dizinden cmd açılır. 
- npm run node_1 yazılır ve http://localhost:3001 sayfasıyla bağlantı sağlanır.
- Farklı bir cmd ekranına; npm run node_2 yazılır ve http://localhost:3002 sayfasıyla bağlantı sağlanır.
- İki url de açılıp, 3001 in url ekleme kısmına http://localhost:3002 yazılır ve ekle butonuna basılır.
- Burada 2 localhost arasında bir ağ kurmuş olduk.
- Daha sonra istenilen localhost'tan veri ekle denilerek istenilen veriler eklenir.
- Eğer veriyi gizli olarak seçerseniz, verinin 1. boşluğundaki (Id) ifadeyi saklamanız gerekir.
- Veriyi eklediğinizde altta bir hash ifadesi çıkacaktır. Bu hash ifadesini de saklamalısınız.
- Bir sonraki adımda, diğer localhost'u açıp orada 'veri ara' seçilir ve önceki hash ifadesi aratılır.
- 
- Arama kısmında küçük bir sıkıntıdan dolayı verilere ulaşmak için iki defa arama butonuna tıklamalısınız.
- 
- Sonuçta gizli olan veri gözükmez.
- Sayfayı yenileyip, bu sefer de detaylı aram yerine saklanılan id yazılarak hash ile beraber aratılırsa;
- Bu sefer gizli olan veriyi de gösterecektir.
-
- İyi günler :)

![1](https://user-images.githubusercontent.com/18140418/211793815-9ebb91ed-6878-4e13-a926-88c7b681f13b.png)
![2](https://user-images.githubusercontent.com/18140418/211793823-43fb2ee5-14fa-4cf8-b0a1-c797eddad643.png)
![3](https://user-images.githubusercontent.com/18140418/211793800-d53310dc-edf9-4aec-926e-8df7e352e569.png)
![4](https://user-images.githubusercontent.com/18140418/211793807-311dfadc-38df-4d04-97d5-047bf2e93c3c.png)
![5](https://user-images.githubusercontent.com/18140418/211793813-49658bff-2cd2-4341-a2e6-445608ae3f61.png)

# Programın çalışma mantığı
# Tek bir localhost kullanarak yapmak için;
- Kodu çalıştırmak için ilk olarak. İndirilen kodun bulunduğu ana dizinden cmd açılır. 
- npm run node_1 yazılır ve http://localhost:3001/ sayfasıyla bağlantı sağlanır.
- http://localhost:3001/blockchain sayfasına gidilir. (uygulamadaki apinin ana sayfası.)
- Uygulamayı test etmek için, http://localhost:3001/mine sayfasına gidilir.
- http://localhost:3001/mine sayfasında yeni bloklar oluşturulur. Bu yüzden biraz beklersiniz.
- Daha sonra http://localhost:3001/blockchain sayfasına geri dönerek oluşturulan bloğa bakabilirsiniz.

# Çoklu localhost ağı kurmak için;
- Kodun ana dizininden ayrı ayrı 5 tane cmd açılır.
- Her bir cmd ekranına, 1.cmd'ye npm run node_1
- 2.cmd'ye npm run node_2 ... diyerek tek tek çalıştırılır.

```sh
> npm run node_1
> npm run node_2
> npm run node_3
> npm run node_4
> npm run node_5
```
- Daha sonra Postman vb. bir program kullanarak, bütün ağı birbirine bağlayacağız.
- 1. Bunun için postman programında url kısmına http://localhost:3001/register-and-broadcast-node yazarız.
- 2. Postman programında url kısmının yanındaki multibox ifadesini POST olarak seçip, Body kısmını seçeriz.
- 3. raw ifadesini seçip Text yazan multibox ifadesini JSON olarak seçeriz.
- 4. Aşağıda verilen kod satırını aynen Body kısmının kod yazma yerine yapıştırın.

```sh
{
    "newNodeUrl": "http://localhost:3002"
}
```

- 5. Send butonuna tıkladığınızda 3001 ile 3002 arasında bir ağ oluşturacaktır.
- 6. Aynı şekilde, ayrı ayrı;


```sh
{
    "newNodeUrl": "http://localhost:3003"
}
```


```sh
{
    "newNodeUrl": "http://localhost:3004"
}
```


```sh
{
    "newNodeUrl": "http://localhost:3005"
}
```

- Diye çalıştırarak ağınızı genişletebilirsiniz.
