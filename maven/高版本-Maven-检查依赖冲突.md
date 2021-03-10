# 高版本 Maven 检查依赖冲突

高版本 Maven 使用 `maven-dependency-plugin` 3.0 版本以后不支持 `-Dverbose` 参数（见官方说明：[https://maven.apache.org/plugins/maven-dependency-plugin/examples/resolving-conflicts-using-the-dependency-tree.html](https://maven.apache.org/plugins/maven-dependency-plugin/examples/resolving-conflicts-using-the-dependency-tree.html)）

可使用以下命令指定插件版本执行：

```bash
mvn org.apache.maven.plugins:maven-dependency-plugin:2.10:tree -Dverbose=true
```

如果有父子依赖的项目，且子 Module 未发布到仓库的时候，可使用以下命令在打包后执行：

```bash
mvn package -Dmaven.test.skip=true org.apache.maven.plugins:maven-dependency-plugin:2.10:tree -Dverbose=true
```